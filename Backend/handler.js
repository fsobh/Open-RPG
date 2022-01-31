
const AWS = require("aws-sdk");
const ResponseUtility = require("./HttpResponse");
const Traits = require("./TraitGenerator");
const SVGenerator = require("./SvgBuilder");
const axios = require('axios');

const s3Bucket = process.env.OPEN_RPG_BUCKET_NAME;
const apiKey = process.env.PINATA_KEY;
const apiSecret = process.env.PINATA_SECRET;
const DISCORD_WEB_HOOK = process.env.OPEN_RPG_DISCORD_WEBHOOK;

const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const jsonUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS"
const { Requester } = require('@chainlink/external-adapter')
AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.S3_ACCESS_ID,
  secretAccessKey: process.env.S3_ACCESS_SECRET,
});

// SEE THIS TO SEE HOW THIS DATA LOOKS ON OPEN SEA https://testnets.opensea.io/assets/0x826e3566d79d6f0d114b638f20c61cf8bb781ff1/1


module.exports = {



    generate: async function (event) {
        // const a = await SVGenerator.BuildImage([3,3]) // first num for weapon , 2nd for frame
        //returns
        //   {
	      // 	   "uploaded": true,
	      // 	   "key": "GgMak2Xvr.svg"
	      //    }

       // Trait API usage
        // let a = Traits.addBoost("Jump",10 /** or "10" */) 
        // let b = Traits.addBoost("Speed","20%")
        // let c = Traits.setNumericTraitWithUpperBound("Dexterity" , 12 , 20)
        // let d = Traits.setLiteralTrait("Personality", "Angry")
        // let e = Traits.setNumericTrait("Stamina", 1.8)
        // let f = Traits.setGeneration(1)
        // let g = Traits.setDateOfBirth(1546360800)
        // let h = Traits.setBooleanLiteralTrait("Stupid", true)

      const pinataSDK = require("@pinata/sdk");
      const FormData = require('form-data');

      var form = new FormData();



        try {

            const request = JSON.parse(event.body);
            
            if (!request.id)
              throw new Error("Missing Oracle Request ID")

           if ( !request.data.weaponClass || !request.data.weaponModifier || !request.data.weaponRarity || !request.data.dob)
                throw new Error("Missing base params");


            if(!/^-?[\d.]+(?:e-?\d+)?$/.test(request.data.weaponClass)    || 
               !/^-?[\d.]+(?:e-?\d+)?$/.test(request.data.weaponModifier) ||
               !/^-?[\d.]+(?:e-?\d+)?$/.test(request.data.weaponRarity)   )
                  throw new Error("One of the values was NOT Numeric Values")


            const pinata = pinataSDK(apiKey, apiSecret);
            pinata.testAuthentication().then((result) => {
                console.log("Authenticated ",result);
            }).catch((err) => {
                console.log(err);
                throw new Error(err)
            });
         
            let s3 = new AWS.S3();


            const svg = await SVGenerator.BuildImage([request.data.weaponClass,request.data.weaponModifier,request.data.weaponRarity]) // first num for weaponClass , 2nd for weaponModifier, 3rd for weaponRarity (frame) 

            if (!svg || !svg.uploaded  || !svg.key || svg.error)
                throw new Error("Svg Error")

            if (!svg.metaData)
                throw new Error("Meta Data was not found for the Selected sketches")    
            
            
            
            
            var params = {
                Bucket: s3Bucket,
                Key: svg.key
            };
         
        
            try {
              await s3.headObject(params).promise()
              console.log(`File ${svg.key} Found in S3 bucket ${s3Bucket}`)
            } catch (err) {
              console.log(`File ${svg.key}  NOT FOUND in S3 bucket ${s3Bucket} || Error : ${err}`)
              throw new Error(err)
            }

            let s3Stream =  s3
              .getObject({
                Bucket: s3Bucket,
                Key: svg.key,
              })
              .createReadStream();

             
                form.append('file', s3Stream, {
                    filename: svg.key //required or it fails
                  });
                  
                  var config = {
                    method: 'post',
                    url: url,
                    'maxBodyLength': 'Infinity',
                    headers: {
                      'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
                      'pinata_api_key': apiKey,
                      'pinata_secret_api_key': apiSecret,
                      ...form.getHeaders()
                    },
                    data: form
                  };
                  
                let res =  await axios(config)

            
                if (res.status === 200 && res.data){
                    
                    const deezNutz =  res.data
                    let MetaDataTemplate = { 
                      "name" : "Open RPG",
                      "description": "A unique sword in the Metaverse",
                      "image" : "",
                      "attributes": [ ]
                  }
                  

                    if (deezNutz.IpfsHash)
                        MetaDataTemplate.image = `https://ipfs.io/ipfs/${deezNutz.IpfsHash}`


                                // let a = Traits.addBoost("Jump",10 /** or "10" */) 
                                // let b = Traits.addBoost("Speed","20%")
                                // let c = Traits.setNumericTraitWithUpperBound("Dexterity" , 12 , 20)
                                // let d = Traits.setLiteralTrait("Personality", "Angry")
                                // let e = Traits.setNumericTrait("Stamina", 1.8)
                                // let f = Traits.setGeneration(1)
                                // let g = Traits.setDateOfBirth(1546360800)
                                // let h = Traits.setBooleanLiteralTrait("Stupid", true)
                    console.log(svg.metaData.weapon.Metadata)
                    console.log(svg.metaData.frame.Metadata.type)



                    

                    MetaDataTemplate.attributes.push(Traits.setDateOfBirth(request.data.dob))
                    MetaDataTemplate.attributes.push(Traits.setGeneration(1))
                    MetaDataTemplate.attributes.push(Traits.setLiteralTrait("Tier", svg.metaData.frame.Metadata.type))

                    // use svg.metaData.weapon/.frame to lopp through the shitt and start adding it in
 
                    for (const [key, value] of Object.entries(svg.metaData.weapon.Metadata)) {

                      if(key == "class")
                        MetaDataTemplate.attributes.push(Traits.setLiteralTrait("Weapon", value))
                      else {

                            key.trim();

                            const attribute = key.charAt(0).toUpperCase() + key.slice(1);

                            MetaDataTemplate.attributes.push(Traits.setLiteralTrait(attribute, value))
                        
                      }
                    }



                  return axios
                  .post(jsonUrl, MetaDataTemplate, {
                      headers: {
                          'pinata_api_key': apiKey,
                          'pinata_secret_api_key': apiSecret,
                      }
                  })
                  .then(async function (response) {
          
                      if (response.status === 200 && response.data && response.data.IpfsHash){
          
                          delete MetaDataTemplate;
                          
                          Requester.success(request.id,
                            {
                              data :  {
                                url : `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
                              },
                              status :"200",
                              error : "0",
                              pending : false
                          }
                          );

                          await axios
                          .post(`https://discordapp.com/api/webhooks/936005729939259432/8XBiE8vcFc9H3kjj_Dr3Qx1sBZxqmS9dAqWOkVboWagTZkpTqStSDNVWd-oMpbUMyzsa`, 
                            {
                            "username": "Open RPG Bot",
                            "avatar_url": "https://gateway.pinata.cloud/ipfs/QmeBYCwrM5XgnhADgicXRncnTL5a1X4n9zfrYZgSmrbAzt",
                            "content": "A new Item was Minted!"
                            }, {
                              headers: {
                                  'Content-Type': 'application/json',
                              }
                          }) 


                          return ResponseUtility.Build(200, {url : `https://ipfs.io/ipfs/${response.data.IpfsHash}`});
          
                      }
                  })
                  .catch(function (error) {
                      console.log(error)
                      throw new Error(JSON.stringify({statusCode : res.status, Message : "Error occured while uploading JSON file to IPFS"}))
                  });
                }
                else{
                    throw new Error(JSON.stringify({statusCode : res.status, Message : "Error occured while uploading files to IPFS"}))   
                    }
              }
        catch (error) {
            
            console.log("Error", error)
             return ResponseUtility.Build(500, { Message: error.message ? error.message : error });
        }


    },


};

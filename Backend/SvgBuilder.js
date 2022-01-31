const AWS = require("aws-sdk");
const jsdom = require("jsdom");
var HTMLParser = require('node-html-parser');
const { JSDOM } = jsdom;
const s3Bucket = "open-rpg-images";
const shortid = require("shortid");
const SVG_TO_PNG = require("svg-png-converter");
const { svg2png } = SVG_TO_PNG;
const { createCanvas, loadImage } = require('canvas')

AWS.config.update({
    region: "us-east-2",
    accessKeyId: process.env.S3_ACCESS_ID,
    secretAccessKey: process.env.S3_ACCESS_SECRET,
  });

  const translate = (replacement, find, arr) => {
    let newArr = []
    arr.forEach((w, i, arr) => {
      let newText = w.trimStart();
      if (newText.trimStart().slice(0, 3) === find) {
        newText = `.${replacement}${newText.substr(3)}`
      }
      newArr.push(newText)
    })
  
    return newArr
  }

const shuffle = (array = ["Axes","Clubs","Daggers","Swords","Hammers", "Polearm"]) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
module.exports = {

  

    BuildImage :  function (numbers = [])  {

    return new Promise(async (resolve, reject) => {
      const convertImage  =  (img) =>  {

        function each(obj,fn) {
          var length = obj.length,
              likeArray = ( length === 0 || ( length > 0 && (length - 1) in obj ) ),
              i = 0;
    
          if ( likeArray ) {
            for ( ; i < length; i++ ) { if ( fn.call( obj[ i ], i, obj[ i ] ) === false ) { break; } }
          } else {
            for (i in obj) { if ( fn.call( obj[ i ], i, obj[ i ] ) === false ) { break; } }
          }
        }
    
        function componentToHex(c) {
          var hex = parseInt(c).toString(16);
          return hex.length == 1 ? "0" + hex : hex;
        }
    
        function getColor(r,g,b,a){
          a = parseInt(a);
          if ( a === undefined || a === 255 ) { return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b); }
          if ( a === 0 ) { return false; }
          return 'rgba('+r+','+g+','+b+','+(a/255)+')';
        }
    
        // Optimized for horizontal lines
        function makePathData(x,y,w) { return ('M'+x+' '+y+'h'+w+''); }
        function makePath(color,data) { return '<path stroke="'+color+'" d="'+data+'" />\n'; }
    
        function colorsToPaths(colors){
    
          var output = ""; 
    
          // Loop through each color to build paths
          each(colors,function(color,values){
            var orig = color;
            color = getColor.apply(null,color.split(','));
    
            if ( color === false ) { return; }
    
            var paths = [];
            var curPath;
            var w = 1;
    
            // Loops through each color's pixels to optimize paths
            each(values,function(){
    
              if ( curPath && this[1] === curPath[1] && this[0] === (curPath[0] + w) ) {
                w++;
              } else {
                if ( curPath ) {
                  paths.push(makePathData(curPath[0],curPath[1],w));
                  w = 1;
                }
                curPath = this;
              }
    
            });
    
            paths.push(makePathData(curPath[0],curPath[1],w)); // Finish last path
            output += makePath(color,paths.join(''));
          });
    
          return output;
        }
    
        var getColors = function(img) {
          var colors = {},
              data = img.data,
              len = data.length,
              w = img.width,
              h = img.height,
              x = 0,
              y = 0,
              i = 0,
              color;
    
          for (; i < len; i+= 4) {
            if ( data[i+3] > 0 ) {
              color = data[i]+','+data[i+1]+','+data[i+2]+','+data[i+3];
              colors[color] = colors[color] || [];
              x = (i / 4) % w;
              y = Math.floor((i / 4) / w);
              colors[color].push([x,y]);
            }                      
          }
    
          return colors;
        }
    
        var window = window || {};
        window.CP = { 
          shouldStopExecution: function(){ return false; },
          exitedLoop: function(){}
        };
    
        var colors = getColors(img),
            paths = colorsToPaths(colors),
            output = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 '+img.width+' '+img.height+'" shape-rendering="crispEdges">\n<metadata>Asset Processed by OpenRPG</metadata>\n' + paths + '</svg>';
    
        // Send message back to the main script
        return output;
    
      }
        
    try {


        
        if (!Array.isArray(numbers))
            throw new Error("Thats not a valid list of rands")

        // if (numbers.every((current)=> typeof(current) == 'number'))
        //     throw new Error("Not all rands were read as strict numeric values (No strings allowed)")    
        
        if (numbers.length > 3) // class, mod, frame
            throw new Error("Thats not a valid list of rands (length)")

        const Types =  shuffle() || ["Axes","Clubs","Daggers","Swords","Hammers", "Polearm"]//add hammer and polearm

        if (numbers[0] > (Types.length - 1)) 
            throw new Error("Weapon Class Value is out of Range")
        
        let s3 = new AWS.S3();
        
        var weaponParamsS3 = {
            Bucket: s3Bucket,
            Key: `Weapons/${Types[parseInt(numbers[0])]}/${numbers[1]}.svg`
        };

      
       

        var frameParamsS3 = {
            Bucket: s3Bucket,
            Key: `Frames/${numbers[2]}.svg`
        };
     
        let weaponMetaData ;
        let frameMetaData ; 
        
        try {
            weaponMetaData =  await s3.headObject(weaponParamsS3).promise()
            frameMetaData = await s3.headObject(frameParamsS3).promise()
            console.log("Files Found in S3")
          } catch (err) {
            console.log("Files not Found ERROR : " + err)
            //throw new Error(err)
          }



            s3.getObject(weaponParamsS3, function(err, data) //get the raw svg data of the frame
            {
                if (!err){

                    const frameRawData = data.Body.toString()

                    console.log("Frame SVG data was Generated")

                    

                    s3.getObject(frameParamsS3, async function(err, data2) //then the raw svg data of the weapon
                    {
                        if (!err){
                            
                            const weaponRawData = data2.Body.toString()

                            console.log("Weapon SVG data was Generated")

                        // *****!!!!!! Heavy work load begins here !!!!!!!!******* //

                            const htmlFrame = HTMLParser.parse(frameRawData)

                            const frameDom = new JSDOM(htmlFrame)
                    
                            const itemDom = new JSDOM(weaponRawData)	// This is weapon DOM, needs to be renamed

                            //frameDom.window.document.getElementById("background").remove() //remove background from sword


                            const swordHtml = itemDom.window.document.querySelector("svg").outerHTML //get the new html of swoard without bg

			                const htmlItem = HTMLParser.parse(swordHtml)

			                const swordPixelClasses = htmlItem.querySelectorAll("rect")

                            // *****!!!!!! Heavy work load here (Renaming pixels so classes dont interfere with other SVG's styles)!!!!!!!!******* //
                    console.log(`Starting Rename process for same named pixels. Total Re-names : ${swordPixelClasses.length} Pixels`)
				            swordPixelClasses.forEach((item) => {

					            const className = item.classNames
					
					            item.setAttribute("class", `sword${className.substr(2)}`)
				            })

                      console.log("Rename Process Finished")

			                const style =  htmlItem.querySelector("style").toString().split("\n\t")

			                const newStyleNames = translate('sword','.st',style).join("\n")
			                htmlItem.querySelector("style").remove()


                            //Layer1 ==> Base Layer
                           
			                frameDom.window.document.getElementById("background").insertAdjacentHTML("beforeend",newStyleNames)
			                frameDom.window.document.getElementById("background").insertAdjacentHTML("beforeend",htmlItem.toString()) // insert sword
                        
                            console.log("Applying Rarity to Weapon")

                            console.log("Serializing Generated SVG and Converting for OpenSea Standards (removing reliance upon ADOBE dependencies)")

                            let SERIALIZED = frameDom.serialize() //returns a string

                            SERIALIZED = SERIALIZED.replace('<html>','')
                            SERIALIZED = SERIALIZED.replace('</html>','')
                            SERIALIZED = SERIALIZED.replace('<head>','')
                            SERIALIZED = SERIALIZED.replace('</head>','')
                            SERIALIZED = SERIALIZED.replace('<body>','')
                            SERIALIZED = SERIALIZED.replace('</body>','')

                            console.log("Decoding SVG into Base64 PNG Format")


                            let data = await svg2png({ 
                              input: Buffer.from(SERIALIZED,'utf-8'), 
                              encoding: 'buffer', 
                              format: 'png',
                              })
                        
                            console.log("Inserting Base64 form into canvas")

                          const canvas = createCanvas(97, 96)
                          const ctx = canvas.getContext('2d')


                        
                          loadImage(Buffer.from(data,'utf-8')).then((image) => {
                            ctx.drawImage(image, 0, 0, 97, 96)
                            
                            const _convertedImageData = ctx.getImageData(0, 0, 97, 96)

                            console.log("Converting refined Image to reduced High Resoloution SVG ")

                            const FINAL = convertImage(_convertedImageData) // <== Most profficient fucking converting algorithm ever ~ Defined at top 
                       

                            const key = `${shortid.generate()}.svg`
                                 s3.upload(
                                    {
                                        Bucket: s3Bucket,
                                        Key: key,
                                        Body: FINAL,
                                        ACL: "public-read"
                                    }
                                ).promise().then(() => {
                                    console.log("Newly Generated SVG was uploaded to S3 Bucket")
                                    resolve({uploaded : true, key : key , metaData : 
                                      {
                                        weapon : weaponMetaData,
                                        frame : frameMetaData

                                      }})
                                });
                              })
                        }
                    }) 
                }// first if !err
            })
        } catch (error) {
            console.log(error)
            reject({uploaded : false , error})
        }
    })

      },

    
   
    
  };
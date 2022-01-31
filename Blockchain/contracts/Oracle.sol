pragma solidity 0.8.7;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./IOpenRPG.sol";


contract Oracle is ChainlinkClient, Ownable {

    event DataUploadConfirmation(uint256 indexed _tokenID , string indexed _uri);

    using Chainlink for Chainlink.Request;
    using Counters for Counters.Counter;

    struct PendingRequest {

        uint256 requestTime;
        bool fullfilled;
        uint256 tokenID;        
    }
    
    struct Tracker{
        uint256 LIMIT;
        Counters.Counter CURRENT;
    }

    
    IOpenRPG OpenRPG;
    
    address private Factory;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    uint [] private RarityLevels = [1,2,3,4,5,6,7];
    mapping(bytes32 => PendingRequest) pendingOracleMappings; 

    mapping(uint => Tracker) tierTrack; 
    
    modifier onlyFactory {
      require(Factory != address(0),'Factory Address Not set yet');
      require(msg.sender == Factory || msg.sender == owner(), 'Mint coming from Unauthorized Source');
      _;
    }


    function setFactory(address _Factory) public onlyOwner {
        Factory = _Factory;
    }

    function setOpenRPGInterface(address _OpenRPG) public onlyOwner {
        require(_OpenRPG != address(0), 'Invalid Contract Address');
        OpenRPG = IOpenRPG(_OpenRPG);
    }

    function getCurrentCirculatingByTier(uint c) public view returns(uint256){

        return tierTrack[c].CURRENT.current();
    }
    constructor() public {

            Factory = address(0);
            setPublicChainlinkToken();
            oracle = 0x262633ce49ec59aF0A0bc2607134Dd7e2273Bb16;//0x1582B78380F49efb5ebcbfBEdD561bF4b911a1AD;
            jobId = "132b0125be0f44358e0b384f5af81020";
            fee = 2 * 10 ** 18; // (Varies by network and job)

     
                tierTrack[1].LIMIT = 5500; 
                tierTrack[2].LIMIT = 3500;
                tierTrack[3].LIMIT = 500;
                tierTrack[4].LIMIT = 300;
                tierTrack[5].LIMIT = 100;
                tierTrack[6].LIMIT = 70;
                tierTrack[7].LIMIT = 30;

            //priceFeed = AggregatorV3Interface(0xDC530D9457755926550b59e8ECcdaE7624181557); //-- Link to eth
    }

    function getLinkFee() external view returns (uint256) {
        return fee;
    } 

    function modulus(uint256 base, uint256 to, uint256 from ) private returns (uint256) {

        return (from + (base % (to - from + 1)));

    }

    function remove(uint value) internal {
            bool found = false;
            for (uint i = 0 ; i<RarityLevels.length-1; i++){
                if (RarityLevels[i] == value){
                    delete RarityLevels[i];
                    RarityLevels[i] = RarityLevels[i+1];
                    found = true;
                    
                }
                if(found)
                    RarityLevels[i] = RarityLevels[i+1];

            }
            
            RarityLevels.pop();
            
    }
    

    function generateRarityBasedOffCurrentSupply(uint256 base ) private returns (uint256){


        //filter the array of any maxed out tiers
       for(uint c = 1 ; c < RarityLevels.length  ; c ++ )
             if (tierTrack[c].CURRENT.current() >= tierTrack[c].LIMIT )
                remove(c);

               
        uint index = modulus(base, (RarityLevels.length -1 ), 0 );

        tierTrack[RarityLevels[index]].CURRENT.increment();

        return RarityLevels[index];

    }




    
    function uploadMetaDataToIPFS(uint256  stats, uint256 tokenID) external onlyFactory returns (bytes32 requestId) 
    {
            Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
            
            //Strings.toString(myUINT)
             uint256 randy =   modulus(stats, 5, 0); 
             
             request.add("weaponClass"   , Strings.toString(randy));
             


             randy = generateRarityBasedOffCurrentSupply(stats);
             request.add("weaponRarity"  , Strings.toString(randy));

             if (randy <= 2 ){

                 request.add("weaponModifier", "1"); 

             }
             else{

             randy = modulus(stats, 5, 2);
             request.add("weaponModifier", Strings.toString(randy));  

             }
 
             request.add("dob", Strings.toString(block.timestamp));
             //add generation
             request.add("path", "url"); //what we want returned
            
            requestId = sendChainlinkRequestTo(oracle, request, fee);

            pendingOracleMappings[requestId].tokenID = tokenID;
            pendingOracleMappings[requestId].fullfilled = true;
                    
        }
        
    function fulfill(bytes32 _requestId, bytes memory _uri) public recordChainlinkFulfillment(_requestId)
    {
            
            uint256 tokenID = pendingOracleMappings[_requestId].tokenID;

            require(tokenID != 0 , "Token ID is 0");

            require(pendingOracleMappings[_requestId].fullfilled == true , "Request Not Found");

            //_setTokenURI(tokenID, stringURI);
            OpenRPG.SetTokenURI(tokenID, string(_uri));

            emit DataUploadConfirmation(tokenID,string(_uri));
        
        }

    receive() payable external {}
    }

  
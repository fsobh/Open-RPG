// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IFactory.sol";



  contract  OpenRPG  is ERC721URIStorage, Ownable {

   using Counters for Counters.Counter;
    
    address private Factory;
    address private Oracle;
    IFactory private InFactory;
    uint constant season = 1;
    uint256 private totalSupplyInt;
    bool private soldOutFlag = false; 
    
    Counters.Counter private initialMintTracker;

    Counters.Counter private burnTracker;

    Counters.Counter private afterBurnMintTracker;

    Counters.Counter private currentCirculatingSupply;

    uint private deadLine;
    

    modifier onlyFactory {
      require(Factory != address(0),'Factory Address Not set yet');
      require(msg.sender == Factory, 'Mint coming from Unauthorized Source');
      _;
   }

    modifier onlyOracle {
      require(Oracle != address(0),'Oracle Address Not set yet');
      require(msg.sender == Oracle, 'SetTokenURI coming from Unauthorized Source');
      _;
   }


    modifier soldOut {

      require(soldOutFlag == true ,'Not Sold out yet - Cannot burn until sell out');
      _;
   }

  function setOracle(address _Oracle) public onlyOwner {  
    Oracle = _Oracle;
  }
 
  function setFactory(address _Factory) public onlyOwner {
    Factory = _Factory;
    InFactory = IFactory(_Factory);
  }

    //VRF data being set in constructor can be found here https://docs.chain.link/docs/vrf-contracts/

  constructor(address _Oracle) ERC721("Open RPG", "ORPG") {
    Factory = address(0);
    Oracle = _Oracle;
    totalSupplyInt = 10000;
    deadLine = block.timestamp + 3 weeks;

  }


  function totalSupply() public view returns (uint) {
    
    if(soldOutFlag == false)
      return totalSupplyInt;
    else 
      currentCirculatingSupply.current();
  }

  function getTotalMintedASO() public view returns (uint) {
    return afterBurnMintTracker.current();
  }

  function getTotalBurned() public view returns (uint) {
    return burnTracker.current();
  }

function userCanMint() external returns (bool)
    {
    
      if((initialMintTracker.current() < totalSupplyInt) &&
         (block.timestamp < deadLine) && (soldOutFlag == false))
            return true;
      else
        return false ;     


  }

  function deadlineIsOver() external returns (bool){
      if(block.timestamp >= deadLine)
        return true;
      else
        return false;  


  }

  function getCurrentlylyMintedBSO() public view returns (uint) {
    return initialMintTracker.current();
  }

   function getAddress() external returns (address){

     return address(this);

  }

  function getDeadLine() external returns (uint){

     return deadLine;

  }

  function getSeason() external pure returns (uint){

     return season;

  }

  function Mint(address to, uint256 token_id) external onlyFactory   returns (uint256 newTokenID)  {
    
    if(block.timestamp >= deadLine)
        afterBurnMintTracker.increment();
    else
        initialMintTracker.increment();
      
    _safeMint(to, token_id);
        
    if(initialMintTracker.current() >= totalSupplyInt)
          soldOutFlag = true;

      currentCirculatingSupply.increment();
    
    return token_id;
  }

  function Burn(uint256[] memory tokenIDs) soldOut external payable{

      require(tokenIDs.length == 5, 'Invalid token ID list');
      
      for(uint c = 0 ; c < 5; c++){
        
        burnTracker.increment();
        currentCirculatingSupply.decrement();
        _burn(tokenIDs[c]);

        //import interface for factory and call mint function. 
      }

      InFactory.Mint(msg.sender);


  }

 

  function SetTokenURI(uint256 token_id, string memory uri) external onlyOracle {
  
    require(_exists(token_id), "Token Does not exist");
  
    _setTokenURI(token_id, uri);

  } 


  function transferTokenTo(address from,address to, uint256 token_id) external  returns (address _from,address _to, uint256 _token_id) {
    
      require(from != address(0) && to != address(0), "Sender/Reciever is Zero Address");
     
      safeTransferFrom(from,to,token_id, 'Token Transfered');

      return (from, to, token_id);
    
  }

  //IMPORTANT !! - This returns the project description to the project page on OpenSea
  function contractURI() public view returns (string memory) {
    return "https://gateway.pinata.cloud/ipfs/QmZxSG1GJwfHdLw8xtVcj4CcLG8FVHR5EzfCjvq1TdoF7c";
  }
  }

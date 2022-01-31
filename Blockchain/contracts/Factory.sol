// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import './IOpenRPG.sol';
import './IOracle.sol';


contract Factory is VRFConsumerBase, Ownable {

    event RandomNumbersGenerated(bytes32 indexed requestId , uint256 value, bytes32 indexed ipfsRequest);
    event TransferReceived(address _from, uint _amount);
    event TransferSent(address _from, address _destAddr, uint _amount);


     struct PendingRequest {
        uint requestTime;
        address sender;
        bool fullfilled;
        uint256 tokenID;        
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(bytes32 => PendingRequest) pendingMappings; //mapping requestS to VRF -- Do Not Touch
    mapping(address => mapping(uint => bool)) private initialMinter;

    IOpenRPG OpenRPG;
    IOracle  DataUploader;
    IUniswapV2Router02 uniswap;
    uint256 public balance;
    address private Oracle;
    address internal constant linkOnRinkeby = 0x01BE23585060835E02B77ef475b0Cc51aA1e0709; // LINK Token ON RINKEBY NETWORK
    address internal constant vrfOnRinkeby = 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B; // VRF Coordinator Address on rinkeby
    bytes32 internal keyHash;
    uint256 internal vrfFee;
    uint256 internal oracleFee;


    constructor(address _openRPG, address _oracle, address _uniswap)
    VRFConsumerBase(vrfOnRinkeby,linkOnRinkeby)
    {
        OpenRPG = IOpenRPG(_openRPG);
        DataUploader = IOracle(_oracle);
        Oracle = _oracle;
        keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
        vrfFee = 0.1 * 10 ** 18; // 0.1 LINK (Varies by network)
        uniswap = IUniswapV2Router02(_uniswap);
       
    }


    function getAddress() public view returns ( address ){

      return address(this);
    }


  
    function getTotalLinkNeededToMint() internal returns (uint256) {

      
        return ((DataUploader.getLinkFee() + vrfFee));

    }

    function expand(uint256 randomValue, uint256 n) public pure returns (uint256[] memory expandedValues) {
        
        expandedValues = new uint256[](n);
        uint256 randomResult;

        for (uint256 i = 0; i < n; i++) { 
            randomResult = uint256(keccak256(abi.encode(randomValue, i))); 
            expandedValues[i] = (randomResult % 5) + 1; 
        }
        
        return expandedValues;
    }

    function getRandomNumber() public returns (bytes32 requestId) {

        require(LINK.balanceOf(address(this)) >= vrfFee, "Not enough LINK - fill contract ");
        return requestRandomness(keyHash, vrfFee);
    }

   
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {

      bytes32 ipfsRequest =  DataUploader.uploadMetaDataToIPFS(randomness, pendingMappings[requestId].tokenID);

      emit RandomNumbersGenerated(requestId,randomness,ipfsRequest);  

      
    }

  

    function Mint(address to) seasonInterfaceSet external payable {  

        if (msg.sender != OpenRPG.getAddress()){

            require(OpenRPG.userCanMint() == true, 'Mint Not allowed');
            require(msg.value >= 0.05 ether, 'Not enough Ethereum to Mint'); // this goes in base
         

        }
        else {
            require(OpenRPG.deadlineIsOver() == true, 'Season is not yet over!');
            require(initialMinter[to][OpenRPG.getSeason()] == true , 'Recieving Burner is not an initial Minter');
        }

       

        //if(LINK.balanceOf(address(this)) < vrfFee || LINK.balanceOf(address(DataUploader)) < DataUploader.getLinkFee()){
              
            BuyLinkForETH(linkOnRinkeby , vrfFee, address(this), (block.timestamp + 5 minutes)); 
        //}

 
        _tokenIds.increment();

       uint256 newItemId = _tokenIds.current() + 1000;

       bytes32 _requestID = getRandomNumber();

        if(pendingMappings[_requestID].fullfilled) {  
   
                //already taken
        }
        else {
            pendingMappings[_requestID].tokenID = newItemId;
            pendingMappings[_requestID].fullfilled = true;
               
        }

        if(msg.sender == OpenRPG.getAddress()){

                OpenRPG.Mint(to,newItemId);
                pendingMappings[_requestID].sender = to;
        }
        else{

            OpenRPG.Mint(msg.sender,newItemId);
            pendingMappings[_requestID].sender = msg.sender;
            initialMinter[msg.sender][OpenRPG.getSeason()] = true;
        }
    }

    function transferERC20(IERC20 token, address to, uint256 amount) private {
    
      
        uint256 erc20balance = token.balanceOf(address(this));
        require(amount <= erc20balance, "balance is low");
        token.transfer(to, amount);
        emit TransferSent(msg.sender, to, amount);
    }    


    function BuyLinkForETH( address token , uint amountOutMin, address reciever,  uint deadline) notBroke internal {

        address[] memory path = new address[](2);
        
        path[0] = uniswap.WETH();
        path[1] = token;
        uniswap.swapExactETHForTokens{value: 0.03 ether}(amountOutMin,path, reciever ,deadline);
        transferERC20(IERC20(token),address(Oracle), (3 * 10 ** 18)); //split the link with the oracle
    }
    function withdraw(uint amount) onlyOwner public  {
       
        require(amount <= balance, "Insufficient funds");
        
        payable(owner()).transfer(amount);
        balance -= amount;
        emit TransferSent(msg.sender, owner(), amount);
    }

    receive() payable external {
        balance += msg.value;
        emit TransferReceived(msg.sender, msg.value);
    } 
    // // Swaps anything back to ETH
    // function sellLinkForETH(address token, uint amountIn, uint amountOutMin, uint deadLine) hasLink internal {

    //     address[] memory path = new address[](2);
        
    //     path[0] = uniswap.WETH();
    //     path[1] = token;
    //     IERC20(token).approve(address(uniswap),amountIn);
    //     uniswap.swapExactTokensForETH(
    //         amountIn,
    //         amountOutMin,
    //         path,
    //         address(this),
    //         deadLine
    //     );

    // }

   

   
    modifier notBroke() {
        require(address(this).balance > 0 ether,"You  Broke");
        _;
    }
    modifier hasLink() {
        require(LINK.balanceOf(address(this)) >= vrfFee, "Not enough LINK - fill contract");
        _;
    }
    modifier seasonInterfaceSet(){
        require(address(OpenRPG) != address(0), 'Open RPG Interface is NULL');
        
        _;

    }  
}



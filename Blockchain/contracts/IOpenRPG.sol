pragma solidity 0.8.7;

 interface IOpenRPG {

    function transferTokenTo(address from,address to, uint256 token_id) external  returns (address _from,address _to, uint256 _token_id);

    function Mint(address to, uint256 token_id) external returns (uint256 newTokenID);

    function SetTokenURI(uint256 token_id, string memory uri) external;

    function Burn(uint256[] memory tokenIDs) external ;

    function getAddress() external returns (address);

    function getDeadLine() external returns (uint);
    
    function getSeason() external pure returns (uint);

    function userCanMint() external returns (bool);

    function deadlineIsOver() external returns (bool); 

}
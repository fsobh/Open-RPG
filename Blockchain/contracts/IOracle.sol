pragma solidity 0.8.7;
interface IOracle {

    function uploadMetaDataToIPFS(uint256  stats, uint256 tokenID) external  returns (bytes32 requestId);
    function getLinkFee() external view returns (uint256);
    //create getters for tracking stats for tokens
}

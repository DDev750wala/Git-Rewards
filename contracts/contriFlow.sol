// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// import "./MockV3Aggregator.sol";
// import "./PriceConverter.sol";

contract ContriFlow is ReentrancyGuard {
    // using PriceConverter for uint256;
    address private immutable i_owner;

    // MockV3Aggregator priceFeed;
    error InvalidRecipient();
    error InvalidUser();
    error InsufficientBalance();
    error TransferFailed();

    event RewardSent(
        address indexed user,
        address indexed recipient,
        uint256 amount,
        string repoName
    );

    event AmountAdded(address indexed user, string repoName, uint256 amount);
    event AmountRemoved(address indexed user, string repoName, uint256 amount);

    mapping(address => mapping(string => uint256)) public userRepoRewards; // user -> repo -> amount

    modifier onlyOwner() {
        require(msg.sender == i_owner, "Not the owner");
        
        _;
    }
// address priceFeedAddress
    constructor() {
        i_owner = msg.sender;
        // priceFeed = MockV3Aggregator(priceFeedAddress);
    }

    function addAmount(address _user,string calldata _repoName)
        external
        payable
        // onlyOwner
    {
        userRepoRewards[_user][_repoName] += msg.value;
        emit AmountAdded(_user, _repoName, msg.value);
    }

    function removeAmount(address _user,string calldata _repoName, uint256 amount)
        external
        payable
        // onlyOwner
    {
        // add condition msg.sender == owner of repository name. -> varified by backend
        if (userRepoRewards[_user][_repoName] < amount) revert InsufficientBalance();
        (bool success, ) = payable(_user).call{value: amount}("");
        require(success, "Withdrawal failed");
        userRepoRewards[_user][_repoName] -= amount ;
        emit AmountRemoved(_user, _repoName, msg.value);
    }

    function sendReward(
        address _user,
        address recipient,
        uint256 amount,
        string calldata _repoName
    ) external payable nonReentrant {
        if (recipient == address(0)) revert InvalidRecipient();
        if (_user == address(0)) revert InvalidUser();
        if (userRepoRewards[_user][_repoName] < amount) revert InsufficientBalance();

        userRepoRewards[_user][_repoName] -= amount;


        (bool sent, ) = payable(recipient).call{value: amount}("");
        if (!sent) revert TransferFailed();

        // amount = amount.getConversionRate(priceFeed);


        emit RewardSent(msg.sender, recipient, amount, _repoName);
    }

    function getRepoAmount(address _addr, string calldata _repoName)
        public 
        view
        returns (uint256)
    {
        return userRepoRewards[_addr][_repoName];
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        (bool success, ) = payable(i_owner).call{value: balance}("");
        require(success, "Withdrawal failed");

        //empty userRepoREward
        
    }

    receive() external payable {
        revert("Direct ETH transfers not allowed");
    }
}
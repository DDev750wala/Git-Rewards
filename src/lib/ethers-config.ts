declare global {
    interface Window {
        ethereum?: any // Declare ethereum as a possible property of window
    }
}


// Replace with your contract's address from Remix
export const CONTRACT_ADDRESS = '0x0c8B1c323209FD745c507AE89C9705937A97171e'

// Replace with your contract's ABI from Remix
export const CONTRACT_ABI = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    { inputs: [], name: 'InsufficientBalance', type: 'error' },
    { inputs: [], name: 'InvalidRecipient', type: 'error' },
    { inputs: [], name: 'InvalidUser', type: 'error' },
    { inputs: [], name: 'ReentrancyGuardReentrantCall', type: 'error' },
    { inputs: [], name: 'TransferFailed', type: 'error' },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'repoName',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'AmountAdded',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'repoName',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'AmountRemoved',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'repoName',
                type: 'string',
            },
        ],
        name: 'RewardSent',
        type: 'event',
    },
    {
        inputs: [
            { internalType: 'address', name: '_user', type: 'address' },
            { internalType: 'string', name: '_repoName', type: 'string' },
        ],
        name: 'addAmount',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: '_addr', type: 'address' },
            { internalType: 'string', name: '_repoName', type: 'string' },
        ],
        name: 'getRepoAmount',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: '_user', type: 'address' },
            { internalType: 'string', name: '_repoName', type: 'string' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'removeAmount',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: '_user', type: 'address' },
            { internalType: 'address', name: 'recipient', type: 'address' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            { internalType: 'string', name: '_repoName', type: 'string' },
        ],
        name: 'sendReward',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: '', type: 'address' },
            { internalType: 'string', name: '', type: 'string' },
        ],
        name: 'userRepoRewards',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    { stateMutability: 'payable', type: 'receive' },
]


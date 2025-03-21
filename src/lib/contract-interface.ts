// Error types
export type ContractErrors = {
    InsufficientBalance: []
    InvalidRecipient: []
    InvalidUser: []
    ReentrancyGuardReentrantCall: []
    TransferFailed: []
}

// Event types
export interface AmountAddedEvent {
    user: string // address
    repoName: string
    amount: bigint // uint256
}

export interface AmountRemovedEvent {
    user: string // address
    repoName: string
    amount: bigint // uint256
}

export interface RewardSentEvent {
    user: string // address
    recipient: string // address
    amount: bigint // uint256
    repoName: string
}

// Function input types
export interface AddAmountParams {
    _user: string // address
    _repoName: string
}

export interface GetRepoAmountParams {
    _addr: string // address
    _repoName: string
}

export interface RemoveAmountParams {
    _user: string // address
    _repoName: string
    amount: bigint // uint256
}

export interface SendRewardParams {
    _user: string // address
    recipient: string // address
    amount: bigint // uint256
    _repoName: string
}

export interface UserRepoRewardsParams {
    address: string // address
    repoName: string
}

// Return types
export type GetRepoAmountReturn = bigint
export type UserRepoRewardsReturn = bigint

// Complete contract interface
export interface RewardContract {
    // Write functions
    addAmount: (params: AddAmountParams, value: bigint) => Promise<void>
    removeAmount: (params: RemoveAmountParams, value: bigint) => Promise<void>
    sendReward: (params: SendRewardParams, value: bigint) => Promise<void>
    withdraw: () => Promise<void>

    // Read functions
    getRepoAmount: (params: GetRepoAmountParams) => Promise<GetRepoAmountReturn>
    userRepoRewards: (
        params: UserRepoRewardsParams
    ) => Promise<UserRepoRewardsReturn>
}

// Event filters
export interface ContractEvents {
    AmountAdded: AmountAddedEvent
    AmountRemoved: AmountRemovedEvent
    RewardSent: RewardSentEvent
}

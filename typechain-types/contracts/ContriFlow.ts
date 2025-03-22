/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface ContriFlowInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addAmount"
      | "getRepoAmount"
      | "removeAmount"
      | "sendReward"
      | "userRepoRewards"
      | "withdraw"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "AmountAdded" | "AmountRemoved" | "RewardSent"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addAmount",
    values: [AddressLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getRepoAmount",
    values: [AddressLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeAmount",
    values: [AddressLike, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "sendReward",
    values: [AddressLike, AddressLike, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "userRepoRewards",
    values: [AddressLike, string]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "addAmount", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRepoAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sendReward", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "userRepoRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export namespace AmountAddedEvent {
  export type InputTuple = [
    user: AddressLike,
    repoName: string,
    amount: BigNumberish
  ];
  export type OutputTuple = [user: string, repoName: string, amount: bigint];
  export interface OutputObject {
    user: string;
    repoName: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AmountRemovedEvent {
  export type InputTuple = [
    user: AddressLike,
    repoName: string,
    amount: BigNumberish
  ];
  export type OutputTuple = [user: string, repoName: string, amount: bigint];
  export interface OutputObject {
    user: string;
    repoName: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RewardSentEvent {
  export type InputTuple = [
    user: AddressLike,
    recipient: AddressLike,
    amount: BigNumberish,
    repoName: string
  ];
  export type OutputTuple = [
    user: string,
    recipient: string,
    amount: bigint,
    repoName: string
  ];
  export interface OutputObject {
    user: string;
    recipient: string;
    amount: bigint;
    repoName: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ContriFlow extends BaseContract {
  connect(runner?: ContractRunner | null): ContriFlow;
  waitForDeployment(): Promise<this>;

  interface: ContriFlowInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addAmount: TypedContractMethod<
    [_user: AddressLike, _repoName: string],
    [void],
    "payable"
  >;

  getRepoAmount: TypedContractMethod<
    [_addr: AddressLike, _repoName: string],
    [bigint],
    "view"
  >;

  removeAmount: TypedContractMethod<
    [_user: AddressLike, _repoName: string, amount: BigNumberish],
    [void],
    "payable"
  >;

  sendReward: TypedContractMethod<
    [
      _user: AddressLike,
      recipient: AddressLike,
      amount: BigNumberish,
      _repoName: string
    ],
    [void],
    "payable"
  >;

  userRepoRewards: TypedContractMethod<
    [arg0: AddressLike, arg1: string],
    [bigint],
    "view"
  >;

  withdraw: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addAmount"
  ): TypedContractMethod<
    [_user: AddressLike, _repoName: string],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "getRepoAmount"
  ): TypedContractMethod<
    [_addr: AddressLike, _repoName: string],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "removeAmount"
  ): TypedContractMethod<
    [_user: AddressLike, _repoName: string, amount: BigNumberish],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "sendReward"
  ): TypedContractMethod<
    [
      _user: AddressLike,
      recipient: AddressLike,
      amount: BigNumberish,
      _repoName: string
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "userRepoRewards"
  ): TypedContractMethod<[arg0: AddressLike, arg1: string], [bigint], "view">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<[], [void], "nonpayable">;

  getEvent(
    key: "AmountAdded"
  ): TypedContractEvent<
    AmountAddedEvent.InputTuple,
    AmountAddedEvent.OutputTuple,
    AmountAddedEvent.OutputObject
  >;
  getEvent(
    key: "AmountRemoved"
  ): TypedContractEvent<
    AmountRemovedEvent.InputTuple,
    AmountRemovedEvent.OutputTuple,
    AmountRemovedEvent.OutputObject
  >;
  getEvent(
    key: "RewardSent"
  ): TypedContractEvent<
    RewardSentEvent.InputTuple,
    RewardSentEvent.OutputTuple,
    RewardSentEvent.OutputObject
  >;

  filters: {
    "AmountAdded(address,string,uint256)": TypedContractEvent<
      AmountAddedEvent.InputTuple,
      AmountAddedEvent.OutputTuple,
      AmountAddedEvent.OutputObject
    >;
    AmountAdded: TypedContractEvent<
      AmountAddedEvent.InputTuple,
      AmountAddedEvent.OutputTuple,
      AmountAddedEvent.OutputObject
    >;

    "AmountRemoved(address,string,uint256)": TypedContractEvent<
      AmountRemovedEvent.InputTuple,
      AmountRemovedEvent.OutputTuple,
      AmountRemovedEvent.OutputObject
    >;
    AmountRemoved: TypedContractEvent<
      AmountRemovedEvent.InputTuple,
      AmountRemovedEvent.OutputTuple,
      AmountRemovedEvent.OutputObject
    >;

    "RewardSent(address,address,uint256,string)": TypedContractEvent<
      RewardSentEvent.InputTuple,
      RewardSentEvent.OutputTuple,
      RewardSentEvent.OutputObject
    >;
    RewardSent: TypedContractEvent<
      RewardSentEvent.InputTuple,
      RewardSentEvent.OutputTuple,
      RewardSentEvent.OutputObject
    >;
  };
}
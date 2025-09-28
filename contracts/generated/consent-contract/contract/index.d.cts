import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
  patientSecretKey(context: __compactRuntime.WitnessContext<Ledger, T>): [T, Uint8Array];
}

export type ImpureCircuits<T> = {
  giveConsent(context: __compactRuntime.CircuitContext<T>,
              patientID_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  revokeConsent(context: __compactRuntime.CircuitContext<T>,
                patientID_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  checkConsent(context: __compactRuntime.CircuitContext<T>,
               patientID_0: Uint8Array): __compactRuntime.CircuitResults<T, number>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  giveConsent(context: __compactRuntime.CircuitContext<T>,
              patientID_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  revokeConsent(context: __compactRuntime.CircuitContext<T>,
                patientID_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  checkConsent(context: __compactRuntime.CircuitContext<T>,
               patientID_0: Uint8Array): __compactRuntime.CircuitResults<T, number>;
}

export type Ledger = {
  patientConsents: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): number;
    [Symbol.iterator](): Iterator<[Uint8Array, number]>
  };
  consentAuthorities: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  readonly round: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;

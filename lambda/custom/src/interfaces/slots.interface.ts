import { Slot } from "ask-sdk-model";

export interface Slots { [key: string]: Slot; }

export interface ResolvedSlot {
  synonym: string;
  resolved: string | number;
  isValidated: Boolean;
}

export interface ResolvedSlots {
  [key: string]: ResolvedSlot;
}
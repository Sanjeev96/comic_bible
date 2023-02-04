import { types } from "mobx-state-tree";
import { DataStore } from "./dataStore";

export const RootStore = types.model("RootStore", {
  // uiStore: types.optional(UIStore, () => UIStore.create()),
  dataStore: types.optional(DataStore, () => DataStore.create()),
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRootStore {
  // uiStore: IUIStore;
  dataStore: any;
}

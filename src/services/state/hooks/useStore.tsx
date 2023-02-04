import { createContext, useContext } from "react";
import { RootStore } from "..";

// create the root store
const rootStore = RootStore.create();
// create a context to allow store access via a custom hook
const storeContext = createContext(rootStore);
// export StoreProvider so it can also be used in mocks
export const StoreProvider = storeContext.Provider;
// export our custom hook which will grant access to our stores
export const useStore = (): typeof rootStore => useContext(storeContext);

import { types } from "mobx-state-tree";

export const DataStore = types
  .model("DataStore", {
    search: types.optional(types.string, ""),
  })
  .actions((self) => ({
    setSearch: (val: string) => {
      self.search = val;
    },
  }))
  .views((self) => ({
    get getSearch() {
      return self.search;
    },
  }));

import { atom } from "recoil";
import { filterParams } from "../utils/filterParams.js";

export const filterAtom = atom({
    key: "filterAtom",
  default: filterParams,
});

export const refreshAtom = atom({
  key:
    "refreshAtom",
  default: false,
});



import { atom } from "recoil";

export const summaryAtom = atom({
    key: "summaryAtom",
  default: {
    totalQuantity: 0,
    totalAmount: 0,
    totalDiscount: 0,
  },
});
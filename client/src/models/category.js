// @flow
export type Category = {
  id: string,
  name: string,
  userId: string,
  selected: boolean // Only client side
};

export const categoryAll: Category = {
  id: "0",
  name: "All",
  userId: "",
  selected: false
};

export default categoryAll;

export const levelList = [
  { name: "所有", value: 0 },
  { name: "体育", value: 1 },
  { name: "其他三方游戏", value: 2 },
  /* { name: "所有", value: "4" }, */
];
export const findLevel = (value: number) =>
  levelList.find((item) => item.value === value);


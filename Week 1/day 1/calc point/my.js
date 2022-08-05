let arr = [
  {
    name: "Ha",
    gender: "female",
    poin: 8,
  },
  {
    name: "Huy",
    gender: "male",
    poin: 9,
  },
  {
    name: "Hung",
    gender: "male",
    poin: 7,
  },
  {
    name: "Phuong",
    gender: "female",
    poin: 6,
  },
  {
    name: "Huyen",
    gender: "female",
    poin: 10,
  },
  {
    name: "Long",
    gender: "male",
    poin: 5,
  },
  {
    name: "Luan",
    gender: "male",
    poin: 10,
  },
  {
    name: "Linh",
    gender: "female",
    poin: 8,
  },
];
let total = 0;
let flag = 0;
arr.forEach((element) => {
  if (element.gender == "male") {
    flag++;
    total += element.poin;
  }
});
console.log(total / flag);

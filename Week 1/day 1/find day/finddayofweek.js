let arr = [
  "chủ nhật",
  "thứ hai",
  "thứ ba",
  "thứ tư",
  "thứ năm",
  "thứ sáu",
  "thứ bảy",
];

let date = new Date();
console.log(arr[date.getDay()]);

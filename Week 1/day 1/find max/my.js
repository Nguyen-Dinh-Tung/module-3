let arr = [2, 5, 6, 456, 2, 76, 1000, 123, 888];
let max = arr[0];

for (let value of arr) {
  if (max < value) {
    max = value;
  }
}
console.log(max);

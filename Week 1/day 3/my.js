async function sum(arr) {
  if (arr instanceof Array) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }
  throw Error("not array");
}

async function f() {
  try {
    let result = await sum(3);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
f();

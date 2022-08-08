function printNumber(number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (number < 0) {
        reject("number < 0");
      } else {
        console.log(number);
        resolve();
      }
    }, 1000);
  });
}

async function printAll() {
  await printNumber(1);
  await printNumber(2);
  await printNumber(-3);
}

printAll()
  .then((r) => console.log("oke"))
  .catch((err) => console.log(err));

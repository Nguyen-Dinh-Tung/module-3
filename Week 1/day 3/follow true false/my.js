async function sum(a, b) {
  if (a != 0 && b != 0) {
    return a + b;
  }
  throw Error("a or b = 0");
}
async function check() {
  try {
    let result = await sum(5, 3);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
check();

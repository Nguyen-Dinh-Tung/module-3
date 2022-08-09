async function diveci(a, b) {
  if (b != 0 && a != 0) {
    return a / b;
  }
  throw Error("b or a = 0");
}
async function check() {
  try {
    let result = await diveci(3, 1);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
check();

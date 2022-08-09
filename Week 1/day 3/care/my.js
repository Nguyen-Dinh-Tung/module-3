async function isBirdDay(isSickKayo) {
  if (isSickKayo) {
    return 2;
  }
  throw Error("Kayo sick");
}
async function somthing() {
  try {
    let result = await isBirdDay(false);
    console.log(result);
  } catch (e) {
    console.log(e);
  } finally {
    console.log("Party");
  }
}
somthing();

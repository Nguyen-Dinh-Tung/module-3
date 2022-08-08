function bd(status) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if ( status) {
        resolve(2);
      } else {
        reject("Bị ốm");
      }
    });
  });
}
bd(true)
  .then((value) => console.log(`Tôi có ${value}`))
  .catch((value) => console.log(`Tôi bị ${value}`))
  .finally(() => console.log("done"));

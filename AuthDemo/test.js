async function f() {
  await new Promise((r) => setTimeout(r, 2000));
  console.log(Date.now());
  return 1;
}

(() => f().then((r) => console.log(r)))();

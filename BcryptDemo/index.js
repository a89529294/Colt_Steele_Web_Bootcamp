const bcrypt = require("bcrypt");

const hashPassword = async (pw) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(pw, saltRounds);

  await bcrypt.compare(pw + " ", hash).then((r) => console.log(r));

  //   console.log(salt);
  //   console.log(hash);
};

hashPassword("monkey");

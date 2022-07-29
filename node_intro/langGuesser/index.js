import { franc } from "franc";
import langs from "langs";

try {
  const str = process.argv[2];
  const guess = franc(str);
  if (guess === "und") console.log("need more info");
  else {
    console.log(langs.where("3", guess).name);
  }
} catch (e) {}

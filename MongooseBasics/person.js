const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});
personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});

personSchema.pre("save", async function () {
  this.first = "Yo";
  this.last = "Mama";
  console.log("about to save");
});
personSchema.post("save", async function () {
  console.log("just saved");
});

const Person = mongoose.model("Person", personSchema);
const someone = new Person({
  first: "Tammy",
  last: "Doe",
});

main().catch((e) => console.log(e));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/shopApp");
  console.log("it worked!");
  someone.save().then((d) => {
    console.log(d);
    console.log(d.fullName);
  });
}

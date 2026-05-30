const { spawn } = require("child_process");

function summon(command, args) {
  //args is array of arguments
  const child = spawn(command, args);

  child.stdout.on("data", (data) => console.log(data));
  //child.stderr.on("data", (data) => console.log(data));

  child.on("close", (data) => console.log(data));
}

// const orcText = "hello bbg";
// const command = "node";
// const args = [
//   "C:\Users\Lenovo\Desktop\semantic search\HuggingFaceModel\allMiniLLm.js",
// ];

summon("node", ["Server\models\allMiniLLm.js", "meow meow"]);

module.exports = {
  summon,
};

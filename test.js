const { embeddings } = require("./models/allMiniLLm");
const { qdrantDB, addVectors, searchQuery } = require("./services/qdrant");

const main = async () => {
  console.log("Running the commands--->");
  console.log("Initiate db-->");
  await qdrantDB();
  console.log("DONEEEEEEEEEEEe");

  try {
    console.log("Adding embeddings--->");
    const input = "dog";
    console.log({ input });
    let vectors = await embeddings(input);
   // printLog(vectors);
    const answer = await addVectors(vectors, {
      name: input,
      imgPath: `C:/testSubject/${input}.jpg`,
      fileName: `${input}.jpg`,
    });
    console.log(answer);

    console.log("searching-->");
    const userQuery = "pet";
    console.log({ userQuery });
    vectors = await embeddings(userQuery);
   // printLog(vectors);

    const result = await searchQuery(vectors);
    //result is an array of point
    for (const point of result) {
      //point is a object
      const payload = point.payload;
      console.log(point.score);
      console.log(payload.fileInfo.name);
      console.log("\n")
    }
  } catch (error) {
    console.error(error);
  }
};
main();

function printLog(vectors) {
  console.log("Vector Embeddings--> [");
  for (let i = 0; i < 4; i++) console.log(vectors[i], ",");
  console.log(vectors[5], "]");
}

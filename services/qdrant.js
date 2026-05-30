const { uuidv4 } = require("./uuid");
let client;

//initialize the db
const qdrantDB = async () => {
  const { QdrantClient } = await import("@qdrant/js-client-rest"); //dynamic way lol

  client = new QdrantClient({ host: "localhost", port: 6333 });

  try {
    await client.createCollection("embedStorage", {
      vectors: { size: 384, distance: "Dot" },
    });
    console.log("Db Online")
  } catch (error) {
    if (error.status === 409) console.log("Db Online");
    else throw error;
  }
};

//adding the embeddings
const addVectors = async (vectors, fileInfo) => {
  const operationInfo = await client.upsert("embedStorage", {
    wait: true,
    points: [
      {
        id: uuidv4(),
        vector: vectors,
        payload: {
          fileInfo, //this is req.file , has 7 things inside
        },
      },
    ],
  });

  //console.debug(operationInfo);
  return operationInfo;
  //ouput-->
  //{ operation_id: 0, status: 'completed' }
};

//search the db
const searchQuery = async (userQueryEmbed) => {
  let searchResult = await client.query("embedStorage", {
    query: userQueryEmbed,
    limit: 3,
    with_payload: true,
  });

 // return searchResult;
  return searchResult.points;
  //console.debug(searchResult.points);
};

module.exports = {
  addVectors,
  searchQuery,
  qdrantDB,
};

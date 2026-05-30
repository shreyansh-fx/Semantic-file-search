const fs = require("fs");
const path = require("path");
const express = require("express");
const { createWorker } = require("tesseract.js");
const { upload } = require("./middleware/multer");
const { embeddings } = require("./models/allMiniLLm");
const { qdrantDB, addVectors, searchQuery } = require("./services/qdrant");
const { generateHtml } = require("./services/genHTML");

const app = express();
app.use(express.json()); //the json parser
qdrantDB();

app.get("/", (req, res) => {
  res.send("the server is working fine");
});                             

app.post("/api/upload", upload.single("image"), async (req, res) => {
  console.log(
    `Received ${req.file.originalname} ${req.file.mimetype} ${Math.floor(req.file.size / 1024)} kb`,
  ); //get some info

  const worker = await createWorker("eng");

  let orcText;

  (async () => {
    const {
      data: { text },
    } = await worker.recognize(
      path.join(__dirname, "/uploads", req.file.originalname),
    );
    console.log("Context--->\n", text);
    orcText = text;
    await worker.terminate();

    //!embeddings-->
    const vectors = await embeddings(orcText);
    console.log("Vector Embeddings--> [");
    for (let i = 0; i < 4; i++) console.log(vectors[i], ",");
    console.log(vectors[5], "]");

    //!! LETS START RAG--->
    const result = await addVectors(vectors, req.file);
    console.log({ status: result.status });
  })();

  res.json({ message: "image received" });
});

app.get("/api/search", async (req, res) => {
  console.log(req.body);
  const { search: query } = req.body;
  console.log(query);
  (async () => {
    const vectors = await embeddings(query);
    const result = await searchQuery(vectors);
    // const html = generateHtml(result);
    res.send(result);
  })();
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`);
});

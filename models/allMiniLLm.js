// const { pipeline } = require("@huggingface/transformers");
async function embeddings(orcText) {
  const { pipeline } = await import("@huggingface/transformers");
  //adapted this nga to type:"commonjs"

  //!SDK STUFF---->
  // Create a feature-extraction pipeline
  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2",
  );

  // Compute sentence embeddings
  const sentences = [orcText || "cat"];
  const output = await extractor(sentences, {
    pooling: "mean",
    normalize: true,
  });
  vectors = Array.from(output.data);
  //console.log(vectors);
  return vectors;
  // Tensor {
  //   dims: [ 2, 384 ],
  //   type: 'float32',
  //   data: Float32Array(768) [ 0.04592696577310562, 0.07328180968761444, ... ],
  //   size: 768
  // }

  //?the arguments route didnt made it far
  // if (!process.argv[2])
  //   console.log({ msg: "no arguments provided , went with the normal route!" });
}

module.exports = {
  embeddings,
};

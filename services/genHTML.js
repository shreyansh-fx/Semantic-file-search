function generateHtml(results) {
  let images = "";
  for (const point of results) {
    const score = point.score;
    const payload = point.payload.fileInfo;
    const name = payload.originalname;
    const filepath = payload.path;

    images += `<img src="${filepath}" alt="${name}">`;
  }
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    ${images}
</body>
</html>
`;
  return html;
}

const results = [
  {
    id: "e82b0f56-1989-4ebb-b4ee-2c2363a8b138",
    version: 4,
    score: 0.6587125,
    payload: {
      fileInfo: {
        fieldname: "image",
        originalname: "Binary Search Tree.jpg",
        encoding: "7bit",
        mimetype: "image/jpeg",
        destination:
          "C:\\Users\\Lenovo\\Desktop\\semantic search\\Server\\uploads",
        filename: "Binary Search Tree.jpg",
        path: "C:\\Users\\Lenovo\\Desktop\\semantic search\\Server\\uploads\\Binary Search Tree.jpg",
        size: 148252,
      },
    },
  },
  {
    id: "995e8710-9716-4547-a730-fdf33fa90b84",
    version: 5,
    score: 0.24223453,
    payload: {
      fileInfo: {
        fieldname: "image",
        originalname:
          "Recursion in C Programming Explained with Call Stack (Advanced Visual Guide).jpg",
        encoding: "7bit",
        mimetype: "image/jpeg",
        destination:
          "C:\\Users\\Lenovo\\Desktop\\semantic search\\Server\\uploads",
        filename:
          "Recursion in C Programming Explained with Call Stack (Advanced Visual Guide).jpg",
        path: "C:\\Users\\Lenovo\\Desktop\\semantic search\\Server\\uploads\\Recursion in C Programming Explained with Call Stack (Advanced Visual Guide).jpg",
        size: 129677,
      },
    },
  },
  {
    id: "c62c0e0b-f090-413c-9ce1-f9f37040aea0",
    version: 2,
    score: 0.23136388,
    payload: {
      fileInfo: {
        name: "cat",
        imgPath: "C:/testSubject/cat.jpg",
        fileName: "cat.jpg",
      },
    },
  },
];

generateHtml(results);

module.exports = {
  generateHtml,
};

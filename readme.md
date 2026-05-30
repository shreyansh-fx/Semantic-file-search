sources-->

embedder: https://huggingface.co/Xenova/clip-vit-base-patch32
ocr: https://github.com/naptha/tesseract.js/blob/master/docs/examples.md
vector db: https://qdrant.tech/documentation/quickstart/


docker run -d --name qdrant -p 6333:6333 qdrant/qdrant

docker start qdrant
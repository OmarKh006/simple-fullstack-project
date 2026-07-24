import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "server under construction" });
});

app.listen(5000, () => {
  console.log("server started http://localhost:5000");
});

import express from "express"
const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({ "res": "babbal" })
})

app.listen(5500, () => {
  console.log("RojgarHub server running at port: 5500")
})

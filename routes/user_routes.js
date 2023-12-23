const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
res.send("get user");
});

router.post("/", (req, res) => {
res.send("post user");
});

router.put("/:id", (req, res) => {
    res.send("put student by id: " + req.params.id);
});

router.delete("/:id", (req, res) =>{
res.send("delete student by id: " + req.params.id);
I});

module.exports = router;
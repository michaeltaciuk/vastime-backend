const express = require("express");
const router = express.Router();

const users = require("./users");

const log = require("debug")("routes");

router.get("/user/:userEmail", async (req, res) => {
    console.log("----------- router.get");
    const { userEmail } = req.params;
    console.log(userEmail);
    const result = await users.getUser(userEmail);
    res.send(result);
});

router.post("/user/new", async (req, res) => {
    console.log("----------- router.post");
    const { body } = req;
    const result = await users.createUser(body);
    res.send(result);
});

router.put("/userup/:userEmail", async (req, res) => {
    console.log("----------- router.put");
    const { body } = req;
    const result = await users.updateUser(body);
    res.send(result);
});

router.delete("/user/:userEmail", async (req, res) => {
    console.log("----------- router.delete");
    const { userEmail } = req.params;
    console.log(userEmail);
    await users.deleteUser(userEmail);
    res.sendStatus(200);
});

module.exports = router;
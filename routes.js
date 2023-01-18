const express = require("express");
const router = express.Router();

const users = require("./users");

const log = require("debug")("routes");

router.get("/user/:userEmail", async (req, res) => {
    console.log("----------- router.get");
    console.log(req);
    const { userEmail } = req.params;
    const result = await users.getUser(userEmail);
    res.send(result);
});

router.post("/user/new", async (req, res) => {
    console.log("----------- router.post");
    console.log(req);
    const { body } = req;
    const result = await users.createUser(body);
    res.send(result);
});

router.put("/user/:userEmail", async (req, res) => {
    console.log("----------- router.put");
    console.log(req);
    const { body } = req;
    const result = await users.updateUser(body);
    res.send(result);
});

router.delete("/user/:userEmail", async (req, res) => {
    console.log("----------- router.delete");
    console.log(req);
    const { email } = req.params;
    await users.deleteUser(email);
    res.sendStatus(200);
});

module.exports = router;
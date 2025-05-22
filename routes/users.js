const express = require("express");
const router = express.Router();
const User = require("../models/User.js"); 


router.post("/create", async(req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a user" });
    }
});

router.get("/", async(req, res) => {
    try {
        const user = await User.find();
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to get a users" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found." });
        }
        res.status(200).send(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem updating the user." });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send({ message: "User not found." });
        }
        res.status(200).send({ message: "User successfully deleted." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem deleting the user." });
    }
});



module.exports = router;
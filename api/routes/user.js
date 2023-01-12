const router = require("express").Router();

const User = require("../models/User");

const CryptoJS = require("crypto-js");

const jwt = require("jsonwebtoken");
const { fetchuser } = require("../middleware/verifyToken");


//Register New User
router.post("/signup", async (req, res) => {

    const newRegistedUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_PASS).toString(),

    });
    try {
        const registedUser = await newRegistedUser.save();
        res.status(201).send(registedUser)
    }
    catch (err) {
        res.status(500).send(err)
    }

})


//Login User
router.post("/login", async (req, res) => {
    try {
        const loginUser = await User.findOne({ email: req.body.email });

        if (!loginUser) {
            res.status(401).send("Wrong Credentials..!");
        }


        //decrypt password using cryptoJS
        const decryptPassword = CryptoJS.AES.decrypt(loginUser.password, process.env.CRYPTO_PASS);

        const loginUserPassword = decryptPassword.toString(CryptoJS.enc.Utf8);

        if (loginUserPassword !== req.body.password) {
            res.status(401).send("Wrong Credentials..!");
        }

        //creating accessToken using jwt
        const accessToken = jwt.sign(
            {
                id: loginUser._id,
                isAdmin: loginUser.isAdmin

            }, process.env.JWT_SEC_KEY,

            { expiresIn: "1d" }

        );

        res.status(200).send({
            accessToken: accessToken,
            status: true,
            message: "Login Successfull....!",
        })

    } catch (err) {

        res.status(500).send(err)

    }

})


//get user details

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user;
        const user = await User.findById(userId).select("-password");

        res.send(user);

    } catch (err) {
        res.status(500).send("Internal Server Isues");
    }
});



module.exports = router;
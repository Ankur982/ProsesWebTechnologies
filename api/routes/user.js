const router = require("express").Router();

const User = require("../models/User");

const CryptoJS = require("crypto-js");

const jwt = require("jsonwebtoken");
const { fetchuser, verifyTokenAndAuthorization } = require("../middleware/verifyToken");


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



router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deletd");
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
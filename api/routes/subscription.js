const router = require("express").Router();
const { verifyToken } = require("../middleware/verifyToken");
const Subscription = require("../models/Subscription");

router.post("/subscription", verifyToken, async (res, req) => {
    const newSubscription = new Subscription({
        name: req.body.name,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        userName: req.body.userName
    });

    try {
        const registedSubscription = await newSubscription.save();
        res.status(200).send(registedSubscription)
    }
    catch (err) {
        res.status(500).send(err)
    }
})




router.get("/subscription", verifyToken, async (req, res) => {
    try {
      const allSubscription = await Subscription.find();
  
      res.status(200).send(allSubscription);
  
    } catch (err) {
      res.status(401).send(err);
    }
  });
  
  

  

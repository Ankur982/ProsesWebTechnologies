const router = require("express").Router();

const { verifyTokenAndAdmin, verifyToken } = require("../middleware/verifyToken");
const Course = require("../models/Course");


//routes to create course and using middleware to verify user is admin

router.post("/course", verifyTokenAndAdmin, async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.send("Course Created Successfully....!");
  } catch (err) {
    res.status(401).send(err)
  }
});


//routes to get course and using middleware to verify user

router.get("/course", verifyToken, async (req, res) => {
  try {
    const allCourses = await Course.find();

    res.status(200).send(allCourses);

  } catch (err) {
    res.status(401).send(err);
  }
});


//routes to delete course and using middleware to verify user is admin

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.deleteOne({ _id: id });
    res.send("Course Deleted Succesfilly....!");
  } catch (e) {
    res.status(404).send(e);
  }
});



//routes to update course and using middleware to verify user is admin

router.patch("/:id", verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    teacher,
    duration,
    validity,
    imageLink,
  } = req.body;

  try {
    if (title) {
      const course = await Course.updateOne(
        { _id: id },
        { $set: { title: title } }
      );
      return res.send("Title updated....!");
    }

    if (description) {
      const course = await Course.updateOne(
        { _id: id },
        { $set: { description: description } }
      );
      return res.send("Description Updated...!");
    }

    if (price) {
      const course = await Course.updateOne(
        { _id: id },
        { $set: { price: price } }
      );
      return res.send("Price Updated....!");
    }

    if (teacher) {
      const course = await Course.updateOne(
        { _id: id },
        { $set: { teacher: teacher } }
      );
      return res.send("Teacher Updated....!");
    }

    if (duration) {
      const course = await Course.updateOne(
        { _id: id },
        { $set: { duration: duration } }
      );
      return res.send("Duration Updated....!");
    }


    if (validity) {
      const course = await Course.updateOne(
        { _id: id },
        { $set: { validity: validity } }
      );
      return res.send("Validity Updated....!");
    }


    if (imageLink) {
      const course = await Course.updateOne(
        { _id: id },
        { $set: { imageLink: imageLink } }
      );
      return res.send("ImageLink Updated...!");
    }
  } catch (e) {
    res.status(404).send(e);
  }

});





module.exports = router;
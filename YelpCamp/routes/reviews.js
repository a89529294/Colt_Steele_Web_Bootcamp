const express = require("express");
const Campground = require("../models/campground");
const Review = require("../models/review");
const catchAsync = require("../utils/catchAsync");
const { reviewSchema } = require("../schemas");
const router = express.Router({ mergeParams: true });

function validateReview(req, res, next) {
  const { error } = reviewSchema.validate(req.body);
  if (error)
    throw new ExpressError(error.details.map((e) => e.message).join(", "), 400);
  next();
}

router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const { body, rating } = req.body.review;
    const review = new Review({ body, rating });
    const campground = await Campground.findByIdAndUpdate(id, {
      $push: {
        reviews: review,
      },
    });
    await review.save();
    req.flash("success", "Created new review!");

    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Campground.findByIdAndUpdate(id, {
      $pull: {
        reviews: reviewId,
      },
    });
    req.flash("success", "Successfully deleted review!");
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;

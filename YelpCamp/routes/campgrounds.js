const express = require("express");
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const { campgroundSchema } = require("../schemas");
const ExpressError = require("../utils/ExpressError");
const router = express.Router();

function validateCampground(req, res, next) {
  const { error } = campgroundSchema.validate(req.body);
  if (error)
    throw new ExpressError(error.details.map((e) => e.message).join(", "), 400);
  next();
}

router.get(
  "/",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

router.get("/new", (req, res) => {
  res.render("campgrounds/new");
});

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findOne({
      _id: req.params.id,
    }).populate("reviews");
    if (!campground) {
      req.flash("error", "Cannnot find that campground!");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
  })
);

router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
      req.flash("error", "Cannnot find that campground!");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
  })
);

router.post(
  "/",
  validateCampground,
  catchAsync(async (req, res, next) => {
    const { title, location, image, price, description } = req.body.campground;
    const c = new Campground({ title, location, image, price, description });
    await c.save();
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`/campgrounds/${c._id}`);
  })
);

router.put(
  "/:id",
  validateCampground,
  catchAsync(async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
    req.flash("success", "Successfully updated the campground!");
    res.redirect(`/campgrounds/${req.params.id}`);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const c = await Campground.findByIdAndDelete(req.params.id);
    req.flash("success", "Successfully deleted campground!");
    res.redirect("/campgrounds");
  })
);

module.exports = router;

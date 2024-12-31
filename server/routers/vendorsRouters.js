const express = require("express");
const { addVendor, getAllVendors, searchVendors } = require("../controllers/vendorsController");

const router = express.Router();

router.post("/vendors", addVendor);
router.get("/vendors", getAllVendors);
router.get("/vendors/search", searchVendors);

module.exports = router;

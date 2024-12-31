const Vendor = require("../models/Vendor");

const addVendor = async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json({ message: "Vendor added successfully!", vendor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vendors." });
  }
};

const searchVendors = async (req, res) => {
  const { category, region } = req.query;
  try {
    const filters = {};
    if (category) filters.category = category;
    if (region) filters.region = region;

    const vendors = await Vendor.find(filters);
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ error: "Failed to search vendors." });
  }
};

module.exports = {
  addVendor,
  getAllVendors,
  searchVendors,
};

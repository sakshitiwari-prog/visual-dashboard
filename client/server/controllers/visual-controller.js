const visual = require("../modals/visual-modal");


const getAllVisualData = async (req, res, next) => {
  let visuals;
  try {
    visuals = await visual.find();
  } catch (error) {
    console.log(`error is ${error}`);
  }
  if (!visuals) {
    res.status(404).json({ message: "Data not found" });
  }
  res.status(200).json({ visuals });
};
 
module.exports = { getAllVisualData};

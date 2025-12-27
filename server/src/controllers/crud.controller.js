const post = (model) => async (req, res) => {
  try {
    const item = await model.create(req.body);
    return res.status(201).json(item);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
};

const postFavourite = (model) => async (req, res) => {
  try {
    const item = await model.create({
      user: req.user._id,
      data: req.body,
    });
    return res.status(201).json(item);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
};

const getAll = (model) => async (req, res) => {
  try {
    const items = await model.find().lean().exec();
    return res.status(200).json(items);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
};

const getFavourites = (model) => async (req, res) => {
  try {
    const items = await model.find({ user: req.user._id }).lean().exec();
    return res.status(200).json(items);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
};

const deleteOne = (model) => async (req, res) => {
  try {
    const item = await model.findByIdAndDelete(req.params.id);
    return res.status(200).json(item);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
};

module.exports = {
  post,
  postFavourite,
  getAll,
  getFavourites,
  deleteOne,
};

console.log("CRUD FINAL EXPORT:", module.exports);

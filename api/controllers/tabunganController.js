exports.add_setor = (req, res) => {
  res.status(200).json({
    code: 200,
    message: "Add Success",
  });
};

exports.get_setor = (req, res) => {
  res.status(200).json({
    code: 200,
    message: "GET Success",
  });
};

exports.get_setor_by_user = (req, res) => {
  res.status(200).json({
    code: 200,
    message: "GET Success with id : " + req.params.userId,
  });
};

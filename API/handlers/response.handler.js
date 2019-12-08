exports.error = (err, res) =>
  res.status(err.code).json({
    status: false,
    statusCode: err.code,
    message: err.message,
    data: null
  });

exports.success = (res, data) =>
  res.status(200).json({
    status: true,
    statusCode: 200,
    message: res.message,
    data: data
  });

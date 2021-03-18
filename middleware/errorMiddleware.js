/* MIDDLEWARE - Error Handler */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  // found this 'if' on SO, fixes console err [ERR_HTTP_HEADERS_SENT]
  // BUT it breaks sending the correct error messages, so you no longer
  // see "Invalid info" or whatever, but the actual error code...
  // if (err) {
  //   return res.send();
  // }
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };

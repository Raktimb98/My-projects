//! This is using promise to handle async functions in Express.js
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

//! This is using asyncHandler function to handle errors in async functions in Express.js
// const asyncHandler = (fn) => async (err, req, res, next) => {
//   try {
//     await fn(err, req, res, next);
//   } catch (error) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message || 'Internal Server Error',
//     });
//   }
// };

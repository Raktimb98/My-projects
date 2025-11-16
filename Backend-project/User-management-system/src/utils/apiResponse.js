function apiResponse(res, status, message = 'Success', data = {}) {
  return res.status(status).json({
    success: status < 400,
    data,
    message,
    errors: [],
  });
}

export default apiResponse;

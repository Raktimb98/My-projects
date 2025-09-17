class ApiResponse {
  constructor(statuscode, data, message = 'Success') {
    this.statuscode = statuscode < 400;
    this.data = data;
    this.message = message;
    this.success = true;
    this.errors = [];
  }
}
export default ApiResponse;
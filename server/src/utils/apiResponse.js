class ApiResponse {
  constructor(statusCode, data, message = "success") {
    (this.success = statusCode < 400);
    (this.data = data),
      (this.statusCode = statusCode),
      this.message = message;
  }
}

export { ApiResponse };



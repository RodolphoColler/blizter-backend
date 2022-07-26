export default function conflictError(error: string) {
  return {
    message: error,
    statusCode: 409,
  };
}

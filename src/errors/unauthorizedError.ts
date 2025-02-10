export default function unauthorizedError(error: string) {
  return {
    message: error,
    statusCode: 401,
  };
}

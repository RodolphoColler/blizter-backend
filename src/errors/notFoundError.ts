export default function notFoundError(error: string) {
  return {
    message: error,
    statusCode: 404,
  };
}

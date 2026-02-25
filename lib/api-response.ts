export function success(data: unknown, status = 200) {
  return Response.json(data, { status });
}

export function failure(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export default function handler(req, res) {
  const baseApi = process.env.BASE_API || "http://localhost:3001";

  return fetch(`http://${baseApi}/api/orders`, {
    method: "POST",
    headers: {
      ...req.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  })
    .then((response) => response.json())
    .then((data) => {
      res.status(data.statusCode || 200).json(data);
    })
    .catch((e) => {
      console.error(e);
      return res.status(500).json({ error: e.message, code: "E01" });
    });
}

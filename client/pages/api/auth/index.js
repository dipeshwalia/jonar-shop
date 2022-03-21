export default function handler(req, res) {
  const { username, password } = req.body;
  const baseApi = process.env.BASE_API || "http://localhost:3001";

  return fetch(`http://${baseApi}/api/auth`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
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

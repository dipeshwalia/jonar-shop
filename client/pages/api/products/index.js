export default function handler(_req, res) {
  const baseApi = process.env.BASE_API || "http://localhost:3001";

  return fetch(
    `http://${baseApi}/api/products?skip=${_req.query.skip}&take=${_req.query.take}`
  )
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      console.error(e);
      return res.status(500).json({ error: e.message, code: "E01" });
    });
}

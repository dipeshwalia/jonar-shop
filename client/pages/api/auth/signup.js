export default function handler(req, res) {
  const { username, password, email, address } = req.body;
  const baseApi = process.env.BASE_API || "http://localhost:3001";

  return fetch(`http://${baseApi}/api/auth/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email, address }),
  })
    .then((resp) => {
      return res
        .status(resp.status)
        .json({ success: resp.status === 201 ? true : false });
    })
    .catch((e) => {
      console.error(e);
      return res.status(500).json({ error: e.message, code: "E01" });
    });
}

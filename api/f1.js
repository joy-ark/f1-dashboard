export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const path = req.query.path;
  if (!path) {
    return res.status(400).json({ error: 'Missing path parameter' });
  }

  const url = `https://api.jolpi.ca/ergast/f1/${path}.json?limit=100`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Upstream error' });
    }
    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=300');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

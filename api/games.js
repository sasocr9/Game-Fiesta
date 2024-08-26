// api/games.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const response = await fetch('https://api.igdb.com/v4/games', {
          method: 'POST',
          headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: req.body, // Forward the body directly from the client
        });
  
        const data = await response.json();
        res.status(response.status).json(data);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
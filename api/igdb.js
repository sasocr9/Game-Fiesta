// api/igdb.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const response = await fetch('https://api.igdb.com/v4/', {
          method: 'POST',
          headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID, // Make sure this matches the name in Vercel
            'Authorization': `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`, // Make sure this matches the name in Vercel
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(req.body)
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
  
import { useEffect, useState } from "react";

function useFetch(api) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/games", {
          method: "POST",
          headers: {
            "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
            Authorization: `Bearer ${import.meta.env.VITE_TWITCH_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: `
            fields *, cover.url, videos;
            ${api}
            limit 20;
          `,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`API Error: ${errorData.message}`);
        }

        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api]);

  return { data, loading };
}

export default useFetch;

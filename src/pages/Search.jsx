import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useTitle from "../hooks/useTitle";

const Search = () => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q") || "";
  const [searchedGames, setSearchedGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);

      try {
<<<<<<< HEAD
        const response = await fetch(`https://api.igdb.com/v4/games`, {
          method: "POST",
          headers: {
            "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
            "Authorization": `Bearer ${import.meta.env.VITE_TWITCH_TOKEN}`,
=======
        const response = await fetch("/api/games", {
          method: "POST",
          headers: {
>>>>>>> my-new-branch
            "Content-Type": "application/json",
          },
          body: `
            fields *, cover.url, videos;
            where name ~ "${queryTerm}"*;
            sort rating desc;
            limit 20;
          `,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSearchedGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
        setError("Failed to load search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (queryTerm) {
      fetchGames();
    }
  }, [queryTerm]);

  useTitle(`Search result for ${queryTerm}`);

  return (
    <main>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <section>
            <p className="text-3xl text-gray-700 dark:text-white my-4 p-2 text-center sm:text-left">
              {searchedGames.length === 0
                ? `No results found for '${queryTerm}'`
                : `Results for '${queryTerm}'`}
            </p>
          </section>
          <section className="max-w-7xl mx-auto pt-0">
            <div
              className={`flex justify-center flex-wrap gap-2 sm:justify-between sm:flex-wrap `}
            >
              {searchedGames.map((game) => (
                <Card key={game.id} game={game} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default Search;

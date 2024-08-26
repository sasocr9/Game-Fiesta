import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useTitle from "../hooks/useTitle";

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [genre, setGenre] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/games`, {
          method: "POST",
          headers: {
            "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
            Authorization: `Bearer ${import.meta.env.VITE_TWITCH_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: `
            fields *, cover.url, videos, genres, rating, game_modes.id, rating_count;
            where id = ${id};
            sort rating desc;
            limit 40;
          `,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        setGame(json[0]);
      } catch (error) {
        console.error("Error fetching game:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const genreIds = game.genres?.map(genre => genre.id) || [];
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/genres`, {
          method: "POST",
          headers: {
            "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
            Authorization: `Bearer ${import.meta.env.VITE_TWITCH_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: `
            fields name;
            where id = (${genreIds.join(",")});
          `,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        setGenre(json);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setError(error.message);
      }
    };

    if (game.genres?.length > 0) {
      fetchGenre();
    }
  }, [game.genres]);

  const renderStars = (rating) => {
    const maxStars = 5;
    const stars = Math.round((rating / 100) * maxStars);
    return (
      <div className="flex">
        {[...Array(maxStars)].map((_, index) => (
          <svg
            key={index}
            className={`w-6 h-6 ${
              index < stars ? "text-yellow-500" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 17.27l6.18 3.73-1.64-7.03 5.46-4.73-7.19-.61L12 2.5 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
          </svg>
        ))}
      </div>
    );
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert from Unix timestamp
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useTitle(`${game.name}/ GameFiesta`);

  return (
    <main>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <section className="flex justify-around flex-wrap py-5">
          <div className="max-w-lg flex justify-center">
            <img
              src={game.cover?.url.replace("/t_thumb/", "/t_720p/") || "https://via.placeholder.com/600"}
              alt={game.name}
              className="rounded pt-6 max-w-[90%] object-contain"
            />
          </div>
          <div className="max-w-2xl text-gray-700 text-lg dark:text-white text-center sm:text-start">
            <h1 className="text-4xl font-bold my-5 text-center lg:text-left">
              {game.name}
            </h1>
            {game.rating && (
              <div className="flex items-center my-4 justify-center sm:justify-start">
                {renderStars(game.rating)}
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  ({Math.round(game.rating) / 20}) {game.rating_count} Reviews
                </span>
              </div>
            )}
            {game.first_release_date && (
              <p className="my-4">
                <strong>Release Date:</strong> {formatDate(game.first_release_date)}
              </p>
            )}
            <p className="my-4">{game.summary}</p>
            {genre.length > 0 && (
              <p className="my-7 flex flex-wrap gap-2">
                {genre.map(({ id, name }) => (
                  <span
                    key={id}
                    className="mr-2 border border-gray-200 rounded dark:border-gray-600 p-2"
                  >
                    {name}
                  </span>
                ))}
              </p>
            )}
            {game.slug && (
              <p className="my-4">
                <a
                  href={`https://www.igdb.com/games/${game.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-20"
                >
                  View on IGDB
                </a>
              </p>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default GameDetail;

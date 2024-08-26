import { Link } from "react-router-dom";

const Card = ({ game }) => {
  const { id,name, cover, first_release_date: date, summary } = game;
  const mediumImageUrl =
    cover?.url.replace("/t_thumb/", "/t_cover_big/") ||
    "https://via.placeholder.com/600";

  return (
    <div className="max-w-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
      <Link to={`/title/${id}`}>
        <img
          className="w-[512px] h-auto  object-contain rounded-t-lg"
          src={mediumImageUrl}
          alt={name || "No title"}
        />
      </Link>
      <div className="p-5">
        <Link to="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name || "No name"}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {date ? new Date(date * 1000).toDateString() : "Unknown release date"}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-4">
          {summary}{" "}
        </p>
        <Link
          to="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Card;

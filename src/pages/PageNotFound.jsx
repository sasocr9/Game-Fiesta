import { useEffect } from "react";
import pageNotFound from "../assets/40444.png";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  useEffect(() => {
    document.title = `Page Not Found / GameFiesta`;
  });

  return (
    <main>
      <section className="flex flex-col justify-center px-2">
        <div className="flex flex-col items-center my-4">
          <p className="text-7xl text-gray-700 font-bold my-10 dark:text-white">
            404, Oops!
          </p>
          <img
            className="rounded bg-darkbg dark:bg-darkbg"
            src={pageNotFound}
            alt="404 pageNotFound"
          />
        </div>
        <div className="flex justify-center my-4">
          <Link to="/">
            <button className="w-64 text-xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 mr-2 mb-2 font-medium rounded-lg dark:text-white hover:from-cyan-500  hover:to-cyan-500">
              Back To Home
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PageNotFound;

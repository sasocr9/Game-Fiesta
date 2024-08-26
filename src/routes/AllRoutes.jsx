import { Routes, Route } from "react-router-dom";
import { GameDetail, GamesList, PageNotFound, Search } from "../pages";

export const AllRoutes = () => {
  const today = Math.floor(new Date().getTime() / 1000);
  const twoYearsFromNow = Math.floor(
    new Date(new Date().setFullYear(new Date().getFullYear() + 2)).getTime() /
      1000
  );
  const latest = `where first_release_date <= ${today} & total_rating_count >= 5;sort first_release_date desc; `;
  const popular = `where total_rating_count >= 30;sort total_rating desc; `;
  const top = `where total_rating != null & total_rating_count >= 15;sort total_rating desc;`;
  const upcoming = `where first_release_date > ${today} & first_release_date <= ${twoYearsFromNow};sort first_release_date asc;`;

  return (
    <div className="dark:bg-darkbg">
      <Routes>
        <Route
          path="/"
          element={
            <GamesList
              heading="Latest Releases"
              api={latest}
              title="GameFiesta || Home"
            />
          }
        />
        <Route path="title/:id" element={<GameDetail />} />
        <Route
          path="games/popular"
          element={<GamesList api={popular} title="GameFiesta || Popular" />}
        />
        <Route
          path="games/top"
          element={<GamesList api={top} title="GameFiesta || Top Rated" />}
        />
        <Route path="search" element={<Search />} />
        <Route
          path="games/upcoming"
          element={<GamesList api={upcoming} title="GameFiesta || Upcoming" />}
        />
        <Route path="*" element={<PageNotFound title="Page Not Found" />} />
      </Routes>
    </div>
  );
};

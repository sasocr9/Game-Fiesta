import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import useFetch from "../hooks/useFetch";
import useTitle from "../hooks/useTitle";

const GamesList = ({ heading, api, name, title }) => {
  const { data: games, loading } = useFetch(api, name);

  useTitle(title);


  return (
    <main>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className="max-w-7xl mx-auto pt-0">
          <h1 className="text-3xl text-orange-400 font-bold pb-6 pt-2 text-center">
            {heading}{" "}
          </h1>
          <div
            className={`flex justify-start flex-wrap gap-2 ${
              heading ? "" : "mt-9"
            } other:justify-evenly`}
          >
            {games.map((game) => (
              <Card key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
export default GamesList;

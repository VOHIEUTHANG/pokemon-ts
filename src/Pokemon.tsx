import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { Pokemon, Pokemons } from "./type";
import { PokemonDetails } from "./type";
import PokemonCollection from "./components/PokemonCollection";
import DetailPokemon from "./components/DetailPokemon";

type PokeContextType = {
  setDetailPoke: React.Dispatch<React.SetStateAction<PokemonDetails>>;
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
};
export const PokeContext = createContext<PokeContextType | undefined>(
  undefined
);

const Poke = () => {
  const [pokes, setPokes] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [detailPoke, setDetailPoke] = useState<PokemonDetails>({
    name: "",
    id: 0,
    image: "",
    abilities: [{ ability: { name: "" } }],
  });
  const [showDetail, setShowDetail] = useState<boolean>(false);

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
      );
      setNextUrl(res.data.next);
      return Promise.all(
        res.data.results.map(async (poke: Pokemons) => {
          const results = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${poke.name}`
          );
          return results.data;
        })
      );
    };
    getPokemon().then((pokes) => {
      setLoading(false);
      setPokes(pokes);
    });
  }, []);

  const loadMoreHandler = async () => {
    setLoading(true);
    const res = await axios.get(nextUrl);
    const nextPokes = await Promise.all(
      res.data.results.map(async (poke: Pokemons) => {
        const results = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${poke.name}`
        );
        return results.data;
      })
    );
    setLoading(false);
    setPokes((prev) => [...prev, ...nextPokes]);
  };

  return (
    <PokeContext.Provider value={{ setDetailPoke, setShowDetail }}>
      <div className="container  mx-auto">
        <header className="pokemon-header mt-6 text-pink-500">Pokemon</header>
        <PokemonCollection pokemons={pokes} />
        <div className="btn">
          <button onClick={loadMoreHandler}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
        {
          <DetailPokemon
            showDetail={showDetail}
            setShowDetail={setShowDetail}
            {...detailPoke}
          />
        }
      </div>
    </PokeContext.Provider>
  );
};

export default Poke;

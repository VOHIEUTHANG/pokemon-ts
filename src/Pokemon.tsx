import axios from "axios";
import { useState, useEffect } from "react";
import { Pokemon, Pokemons } from "./type";
import PokemonCollection from "./components/PokemonCollection";

const Poke = () => {
  const [pokes, setPokes] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
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
    getPokemon().then((pokes) => setPokes(pokes));
  }, []);
  const loadMoreHandler = async () => {
    const res = await axios.get(nextUrl);
    const nextPokes = await Promise.all(
      res.data.results.map(async (poke: Pokemons) => {
        const results = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${poke.name}`
        );
        return results.data;
      })
    );
    setPokes((prev) => [...prev, ...nextPokes]);
  };
  return (
    <div className="container  mx-auto">
      <header className="pokemon-header mt-6 text-pink-500">Pokemon</header>
      <PokemonCollection pokemons={pokes} />
      <div className="btn">
        <button onClick={loadMoreHandler}>Load More</button>
      </div>
    </div>
  );
};

export default Poke;

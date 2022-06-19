import { useContext } from "react";
import { PokeContext } from "../Pokemon";
import { Pokemon, PokemonDetails } from "../type";
import PokemonList from "./PokemonList";

const PokemonCollection = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const pokeContextValue = useContext(PokeContext);
  const openPokemonDetailModal = (poke: PokemonDetails) => {
    if (pokeContextValue) {
      pokeContextValue.setDetailPoke(poke);
      pokeContextValue.setShowDetail(true);
    }
  };
  return (
    <div>
      <section className="collection-container">
        {pokemons?.map((poke, index) => (
          <div
            key={index}
            onClick={() => {
              openPokemonDetailModal({
                name: poke.name,
                id: poke.id,
                abilities: poke.abilities,
                image: poke.sprites.front_default,
              });
            }}
          >
            <PokemonList
              id={poke.id}
              abilities={poke.abilities}
              name={poke.name}
              image={poke.sprites.front_default}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default PokemonCollection;

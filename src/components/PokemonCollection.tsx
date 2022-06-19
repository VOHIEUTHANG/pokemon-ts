import { Pokemon } from "../type";
import PokemonList from "./PokemonList";

const PokemonCollection = ({ pokemons }: { pokemons: Pokemon[] }) => {
  return (
    <div>
      <section className="collection-container">
        {pokemons?.map((poke, index) => (
          <PokemonList
            key={index}
            id={poke.id}
            name={poke.name}
            image={poke.sprites.front_default}
          />
        ))}
      </section>
    </div>
  );
};

export default PokemonCollection;

import React from "react";

type Props = {
  name: string;
  id: number;
  image: string;
};
const PokemonList = ({ name, image, id }: Props) => {
  return (
    <div>
      <section className="pokemon-list-container">
        <p className="pokemon-name">{name}</p>
        <img src={image} alt="Pokemon" />
      </section>
    </div>
  );
};

export default PokemonList;

import React from "react";
import { PokemonDetails } from "../type";

const PokemonList = ({ name, image }: PokemonDetails) => {
  return (
    <div>
      <section className="pokemon-list-container">
        <p className="pokemon-name">{name}</p>
        <img src={image} alt="Pokemon" />
        <div className="h-[1px] w-full bg-gray-300" />
      </section>
    </div>
  );
};

export default PokemonList;

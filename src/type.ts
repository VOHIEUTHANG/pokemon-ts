export type Pokemons = { name: string; url: string };
export type Pokemon = {
  name: string;
  id: number;
  sprites: { front_default: string };
  abilities?: {
    ability: { name: string };
  }[];
};

export type PokemonDetails = {
  name: string;
  id: number;
  image: string;
  abilities:
    | {
        ability: { name: string };
      }[]
    | undefined;
};

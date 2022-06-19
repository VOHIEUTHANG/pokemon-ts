import { PokemonDetails } from "../type";
type PropsType = PokemonDetails & {
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  showDetail: boolean;
};

const DetailPokemon = ({
  name,
  image,
  abilities,
  setShowDetail,
  showDetail,
}: PropsType) => {
  return (
    <div
      onClick={() => {
        setShowDetail(false);
      }}
      className={`${
        !showDetail ? "opacity-0 invisible" : "opacity-100 visible"
      } fixed w-screen duration-100 h-screen top-0 transition ease-in-out left-0 bg-gray-900/75 z-50 flex justify-center items-center`}
    >
      <section
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="pokemon-list-container px-[30px] pb-2  relative"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowDetail(false);
          }}
          className={` p-[4px] absolute top-[4px] right-[8px] font-bold text-black-200 hover:text-red-500 transition ease-in-out`}
        >
          X
        </div>
        <p className="pokemon-name">{name}</p>
        <img src={image} alt="Pokemon" />
        <div className="h-[1px] w-full bg-gray-300" />
        <div>
          {abilities?.map((ab) => {
            return <div className="text-center">{ab.ability.name}</div>;
          })}
        </div>
      </section>
    </div>
  );
};

export default DetailPokemon;

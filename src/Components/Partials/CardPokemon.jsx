import React from "react";

const CardPokemon = ({ name, index, attribute, addPokemon }) => {
  const handleCatch = () => {
    // Crea un nuovo oggetto Pokémon da aggiungere
    const newPokemon = {
      name: attribute.name,
      id: attribute.id,
    };

    // Chiama la funzione `addPokemon` passata come prop
    addPokemon(newPokemon);
  };

  return (
    <div className="col-md-3" key={index}>
      <div className="card-sl">
        <div className="card-image">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${attribute.id}.png`}
            alt={name}
          />
        </div>

        <div className="card-heading text-capitalize">{name}</div>
        <div className="card-text">This is a Pokémon from the Pokédex.</div>
        <button onClick={handleCatch} className="card-button">
          Cattura il Pokémon
        </button>
      </div>
    </div>
  );
};

export default CardPokemon;

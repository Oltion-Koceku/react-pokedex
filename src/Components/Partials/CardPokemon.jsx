// CardPokemon.js
import React from "react";


const CardPokemon = ({ name, index, attribute, addPokemon }) => {
  const handleCatch = () => {
    const newPokemon = {
      name: attribute.name,
      id: attribute.id,
    };
    addPokemon(newPokemon);
  };

  return (
    <div className="pokemon-card">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title text-capitalize">{name}</h2>
        </div>
        <div className="card-image">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${attribute.id}.png`}
            alt={name}
          />
        </div>
        <div className="card-content">
          <p className="card-text">
            Tipo: {attribute.types.map((typeInfo) => typeInfo.type.name).join(", ")}
          </p>
          <p className="card-text">Peso: {attribute.weight}</p>
          <p className="card-text">Altezza: {attribute.height}</p>
        </div>
        <div className="card-footer">
          <button onClick={handleCatch} className="card-button">
            Cattura il Pokémon
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPokemon;

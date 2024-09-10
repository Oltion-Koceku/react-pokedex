import React from "react";

const CardPokemon = ({ name, index, attribute }) => {
  return (
    <div className="col-md-3" key={index}>
      <div className="card-sl">
        <div className="card-image">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${attribute.id}.png`}
            alt={name}
          />
        </div>

        <div className="card-heading">{name}</div>
        <div className="card-text">This is a Pokémon from the Pokédex.</div>
        <a href="#" className="card-button">
          Details
        </a>
      </div>
    </div>
  );
};

export default CardPokemon;

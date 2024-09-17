import React, { useEffect, useState } from "react";
import PokeBall from './PokeBall.jsx';

const CardPokemon = ({ name, index, attribute, addPokemon }) => {
  const [pokeBall, setPokeBall] = useState(false);
  const storedPokemon = JSON.parse(localStorage.getItem('myPokemon') || '{}'); // Usare un oggetto vuoto di default

  const pokeBalls = () => {
    if (storedPokemon[attribute.id]) {
      // Se il Pokémon è già stato catturato
      setPokeBall(true);
    } else {
      // Se il Pokémon non è ancora stato catturato
      setPokeBall(false); // Mantieni lo stato della Poké Ball chiusa
    }
  };

  const handleCatch = () => {
    if (storedPokemon[attribute.id]) {
      // Se il Pokémon è già stato catturato
      alert(`${name} è già stato catturato!`);
    } else {
      // Se il Pokémon non è ancora stato catturato
      setPokeBall(true); // Cambia lo stato per mostrare la Poké Ball

      const newPokemon = {
        name: attribute.name,
        id: attribute.id,
      };

      addPokemon(newPokemon);

    }
  };

  useEffect(() => {
    pokeBalls();
  }, []);

  return (
    <div className="pokemon-card">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title text-capitalize">{name}</h2>
        </div>
        <div className="card-image d-flex justify-content-center">
          {pokeBall ? (
            <PokeBall />
          ) : (
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${attribute.id}.png`}
              alt={name}
            />
          )}
        </div>
        <div className="card-content">
          <p className="card-text">
            Tipo: {attribute.types.map((typeInfo) => typeInfo.type.name).join(", ")}
          </p>
          <p className="card-text">Peso: {attribute.weight} KG</p>
          <p className="card-text">Altezza: {attribute.height} M</p>
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

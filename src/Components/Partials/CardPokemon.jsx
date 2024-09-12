import { useEffect, useState } from "react";
import React from "react";

const CardPokemon = ({ name, index, attribute }) => {

  const handleCatch = (attribute) => {
    // Recupera i Pokémon catturati o inizializza con un oggetto vuoto se non esiste
    let caughtPokemon;
    const storedPokemon = localStorage.getItem('myPokemon');

    // Controlla se esiste un valore nel localStorage e prova a fare il parsing
    if (storedPokemon) {
      try {
        caughtPokemon = JSON.parse(storedPokemon) || {};
      } catch (error) {
        console.error("Errore nel parsing di JSON: ", error);
        caughtPokemon = {}; // Inizializza come un oggetto vuoto se il parsing fallisce
      }
    } else {
      caughtPokemon = {}; // Inizializza come oggetto vuoto se non c'è niente nel localStorage
    }

    // Verifica se il Pokémon è già stato catturato
    if (!caughtPokemon[attribute.name]) {
      // Aggiungi il Pokémon alla lista
      caughtPokemon[attribute.name] = attribute;

      // Aggiorna il localStorage con la nuova lista di Pokémon
      localStorage.setItem('myPokemon', JSON.stringify(caughtPokemon));

      console.log(`${attribute.name} è stato catturato!`);
      // Object.values(caughtPokemon).forEach(pokemon => {
      //   console.log(pokemon.name);
        
      // });

      delete caughtPokemon['rattata']
      
    } else {
      console.log(`${attribute.name} è già stato catturato.`);

    }
  }

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
         {/* funzione anonima () => nel gestore onClick per evitare che venga eseguita immediatamente  */}
        <button onClick={() => handleCatch(attribute)} className="card-button">
          Cattura il Pokemon
        </button>
      </div>
    </div>
  );
};

export default CardPokemon;

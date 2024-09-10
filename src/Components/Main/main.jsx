import React, { useState, useEffect } from "react";
import Axios from "axios";
import CardPokemon from "../Partials/CardPokemon";

const Main = () => {
  const [listPokemon, setListPokemon] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [allSuggestions, setAllSuggestions] = useState([]); // Stato per mantenere tutti i Pokémon
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Stato per suggerimenti filtrati

  const getAttribute = (url, name) => {
    if (typeof url !== "string") {
      return setListPokemon([{ name, data: url }]);
    }
    Axios.get(url)
      .then((res) => {
        setListPokemon((prevList) => [
          ...prevList,
          {
            name,
            data: res.data,
          },
        ]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Funzione per ottenere i dati dall'API
  const getApi = () => {
    // Ottieni i nomi di tutti i Pokémon per i suggerimenti
    Axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then((res) => {
        const pokemonNames = res.data.results.map((pokemon) => pokemon.name); // Crea un array con i nomi
        setAllSuggestions(pokemonNames); // Imposta l'elenco completo dei suggerimenti
      })
      .catch((error) => {
        console.log(error.message);
      });

    // Stampa i primi 20 Pokémon
    Axios.get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        res.data.results.forEach((pokemon) => {
          getAttribute(pokemon.url, pokemon.name);
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getSuggestions = (value) => {
    // Filtra i suggerimenti mentre l'utente digita
    if (value.trim() === "") {
      setFilteredSuggestions([]); // Se l'input è vuoto, non mostrare suggerimenti
      return;
    }

    const filtered = allSuggestions.filter((name) =>
      name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredSuggestions(filtered); // Aggiorna solo i suggerimenti filtrati
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    getSuggestions(value); // Aggiorna i suggerimenti filtrati mentre l'utente digita
  };

  const searchPokemon = (e) => {
    e.preventDefault(); // Previene il refresh della pagina
    if (searchValue.trim() === "") {
      const message = "Devi inserire dei caratteri corretti";
      return console.log(message);
    }
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
      .then((res) => {
        getAttribute(res.data, res.data.name);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // useEffect per chiamare l'API una volta al caricamento del componente
  useEffect(() => {
    getApi();
  }, []);

  // per vedere i log in modo asincrono
  useEffect(() => {
    console.log(filteredSuggestions);
  }, [filteredSuggestions]);

  return (
    <div className="Main">
      <div className="container">
        <div className="searchMenu pt-5">
          <form onSubmit={searchPokemon} className="d-flex" role="search">
            <input
              className="form-control me-2 w-25"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchValue}
              onChange={handleSearchChange} // Aggiorna lo stato
              list="datalistOptions"
            />
            <datalist id="datalistOptions">
              {filteredSuggestions.map((suggestion, index) => (
                <option key={index} value={suggestion} />
              ))}
            </datalist>
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="cards">
          <div className="container" style={{ marginTop: "50px" }}>
            <div className="row">
              {Array.isArray(listPokemon) ? (
                listPokemon.length > 0 ? (
                  listPokemon.map((pokemon, index) => (
                    <CardPokemon
                      key={index}
                      name={pokemon.name}
                      attribute={pokemon.data}
                      index={index}
                    />
                  ))
                ) : (
                  <p>Loading Pokémon...</p>
                )
              ) : (
                <CardPokemon
                  name={listPokemon.name}
                  attribute={listPokemon.data}
                  index={0}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

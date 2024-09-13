import React, { useState, useEffect } from "react";
import Axios from "axios";
import CardPokemon from "../Partials/CardPokemon";
import Loader from "../Partials/Loader";
import MyPokemon from "../Partials/MyPokemon";

const Main = () => {
  // costanti per il componente MyPokemon
  const [myPokemon, setMyPokemon] = useState([]);
  const [message, setMessage] = useState("Non hai catturato nessun pokemon");

  const [listPokemon, setListPokemon] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [allSuggestions, setAllSuggestions] = useState([]); // Stato per mantenere tutti i Pokémon
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Stato per suggerimenti filtrati
  const [loading, setLoading] = useState(false); // Usa lo stato per gestire il caricamento

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
    setLoading(true);
    if (listPokemon.length > 0) {
      setListPokemon([])
    }
    Axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then((res) => {
        const pokemonNames = res.data.results.map((pokemon) => pokemon.name); // Crea un array con i nomi
        setAllSuggestions(pokemonNames); // Imposta l'elenco completo dei suggerimenti
      })
      .catch((error) => {
        console.log(error.message);
      });

    Axios.get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        res.data.results.forEach((pokemon) => {
          getAttribute(pokemon.url, pokemon.name);
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  const randomPokemon = () => {
    setLoading(true);
    const randomName =
      allSuggestions[Math.floor(Math.random() * allSuggestions.length)];
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${randomName}`)
      .then((res) => {
        getAttribute(res.data, res.data.name);
        setLoading(false);
        
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  const getSuggestions = (value) => {
    if (value.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = allSuggestions.filter((name) =>
      name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    getSuggestions(value);
  };

  const searchPokemon = (e) => {
    e.preventDefault();
    if (searchValue.trim() === "") {
      return console.log("Devi inserire dei caratteri corretti");
    }
    setLoading(true);
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
      .then((res) => {
        getAttribute(res.data, res.data.name);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

    // Funzioni per il componente MyPokemon

    const getPokemon = () => {
      const storedPokemon = JSON.parse(localStorage.getItem("myPokemon"));
      
      if (storedPokemon && storedPokemon.length > 0) {
        setMyPokemon(storedPokemon);
      } else {
        setMyPokemon([]);
        console.log(storedPokemon ? storedPokemon.length : 0);
      }
    };
  
    const clearLocalStorage = () =>{
      setMyPokemon([]);
      localStorage.removeItem("myPokemon");
    }


    const addPokemon = (newPokemon) => {
      // Verifica se il Pokémon è già stato catturato
      const alreadyCaught = myPokemon.some(pokemon => pokemon.name === newPokemon.name);
  
      if (!alreadyCaught) {
        const updatedPokemon = [...myPokemon, newPokemon];
        setMyPokemon(updatedPokemon);
        localStorage.setItem("myPokemon", JSON.stringify(updatedPokemon));
      } else {
        console.log(`${newPokemon.name} è già stato catturato.`);
      }
    };

  useEffect(() => {
    getApi();
    getPokemon();
  }, []);

  return (
    <div className="Main position-relative">
      <MyPokemon myPokemon={myPokemon} message={message} clearLocalStorage={clearLocalStorage} />
      <div className="container">
        <div className="searchMenu pt-5 d-flex">
          <form onSubmit={searchPokemon} className="d-flex" role="search">
            <input
              className="form-control me-2 w-100"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchValue}
              onChange={handleSearchChange}
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
          <button
            onClick={randomPokemon}
            className="btn btn-outline-danger mx-2"
            type="button"
          >
            Random Pokemon
          </button>
          <button
            onClick={getApi}
            className="btn btn-outline-warning mx-1"
            type="button"
            
          >
            Reset
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <Loader />
          </div>
        ) : (
          <div className="cards">
            <div className='container h-100'  style={{ marginTop: "50px" }}>
              <div className={`row ${listPokemon.length === 1 ? 'hvh' : ''}`}>
                {listPokemon.length > 0 ? (
                  listPokemon.map((pokemon, index) => (
                    <CardPokemon
                      key={index}
                      name={pokemon.name}
                      attribute={pokemon.data}
                      index={index}
                      addPokemon={addPokemon}
                    />
                  ))
                ) : (
                  <p>No Pokémon found</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;

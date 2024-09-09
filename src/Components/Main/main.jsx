import React, { useState, useEffect } from "react";
import Axios from "axios";

const Main = () => {
  const [listPokemon, setListPokemon] = useState([]);

   const getAttribute = (url, name) =>{
    Axios.get(url)
    .then(res =>{
      console.log(name, res.data);
       setListPokemon((prevList) =>[
        ...prevList, 
        {
          name, data: res.data,
        }
       ]);
      
    })
    .catch(error =>{
      console.log(error.message);
      
    })
   }

  // Funzione per ottenere i dati dall'API
  const getApi = () => {
    Axios.get("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => {

        res.data.results.forEach(pokemon => {
          getAttribute(pokemon.url, pokemon.name)
        });
        
        console.log(res.data.results);
        
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // useEffect per chiamare l'API una volta al caricamento del componente
  useEffect(() => {
    getApi();
  }, []);

  return (
    <div className="Main">
      <div className="container">
        <div className="searchMenu">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2 w-25"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="cards">
          <div className="container" style={{ marginTop: "50px" }}>
            <div className="row">
              {listPokemon.length > 0 ? (
                listPokemon.map((pokemon, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="card-sl">
                      <div className="card-image">
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.data.order}.png`}
                          alt={pokemon.name}
                        />
                      </div>

                      <div className="card-heading">{pokemon.name}</div>
                      <div className="card-text">
                        This is a Pokémon from the Pokédex.
                      </div>
                      <a href="#" className="card-button">
                        Details
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading Pokémon...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

import React, { useState, useEffect } from "react";
import Axios from "axios";
import CardPokemon from "../Partials/CardPokemon";

const Main = () => {
  const [listPokemon, setListPokemon] = useState([]);

   const getAttribute = (url, name) =>{
    Axios.get(url)
    .then(res =>{
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
        
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // useEffect per chiamare l'API una volta al caricamento del componente
  useEffect(() => {
    getApi();
  }, []);

  // per vedere i log in modo asyincrono
  useEffect(() => {
    console.log(listPokemon);
  }, [listPokemon]);


  return (
    <div className="Main">
      <div className="container">
        <div className="searchMenu pt-4">
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
                 <CardPokemon
                  name={pokemon.name}
                  attribute={pokemon.data}
                  index={index}
                  />
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

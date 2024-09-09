import React, {useState, useEffect} from 'react';
import Axios from 'axios'


const Main = () => {


  const getApi = () =>{
    Axios.get('https://pokeapi.co/api/v2/pokemon/')
    .then(res =>{
      console.log(res.data);
    })
    .catch(error => {
      console.log(error.message);
      
    })
  }

  useEffect (() =>{
    getApi();
  })


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
      </div>
    </div>
  );
};

export default Main;

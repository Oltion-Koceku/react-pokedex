import React, { useEffect, useState } from "react";

const MyPokemon = ({myPokemon,message, clearLocalStorage}) => {


  return (
    <div className="pokedex text-white position-fixed">
      <div className="container d-flex flex-column">
        <div className="top">
          <div className="circle">
            <div className="little"></div>
          </div>
          <div className="lights">
            <div className="circle-1"></div>
            <div className="circle-2"></div>
            <div className="circle-3"></div>
          </div>
        </div>
        <div className="main d-flex flex-column">
          <div className="display">
            {myPokemon.length > 0 ? (
              myPokemon.map((data, index) => (
                <div key={index} className="myPokemon d-flex justify-content-around align-items-center">
                  <div className="name">
                    <p className="text-capitalize">{data.name}</p>
                  </div>
                  <div className="img">
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`}
                      alt={data.name}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="message d-flex justify-content-center align-items-center">
                <p>{message}</p>
              </div>
            )}
          </div>
        </div>
          <div onClick={clearLocalStorage} className="btn btn-success free">
            Libera tutti i pokemon
          </div>
      </div>
    </div>
  );
};

export default MyPokemon;

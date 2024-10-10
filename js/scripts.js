// Check if the pokemonRepository is already defined
if (typeof pokemonRepository === 'undefined') {
  // IIFE to encapsulate pokemonList
  let pokemonRepository = (function() {
      let pokemonList = [];
      let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

      function getAll() {
          return pokemonList;
      }

      function add(pokemon) {
          if (typeof pokemon === 'object' && pokemon.name && pokemon.detailsUrl) {
              pokemonList.push(pokemon);
          } else {
              console.log('Invalid Pokemon entry.');
          }
      }

      function loadList() {
          return fetch(apiUrl).then(function(response) {
              return response.json();
          }).then(function(json) {
              json.results.forEach(function(item) {
                  let pokemon = {
                      name: item.name,
                      detailsUrl: item.url
                  };
                  add(pokemon);
              });
          }).catch(function(e) {
              console.error(e);
          });
      }

      // Other functions...

      return {
          getAll: getAll,
          add: add,
          // Other public functions...
      };
  })();

  // Load the list of Pokemon
  pokemonRepository.loadList().then(function() {
      pokemonRepository.getAll().forEach(function(pokemon) {
          // Code to add list items...
      });
  });
}





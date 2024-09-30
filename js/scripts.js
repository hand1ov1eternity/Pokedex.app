// IIFE to encapsulate pokemonList
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; // Add API

  // Function to return all items in pokemonList
  function getAll() {
    return pokemonList;
  }

  // Function to add a new item to pokemonList
  function add(pokemon) {
    if (typeof pokemon === 'object' && pokemon.name && pokemon.detailsUrl) {
      pokemonList.push(pokemon);
    } else {
      console.log('Invalid Pokemon entry. Please provide a valid object with name and detailsUrl.');
    }
  }

  //Function to load the complete list of Pokemon from the API
  function loadlist() {
    return fetch(apiUrl).then(function(response){
      return response.json();
    }).then(function(json){
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e){
      console.error(e);
    });
  }

  //Function to load details of a Pokemon using its detailsUrl
  function loadDetails(pokemon) { 
    let url = pokemon.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types.map((typeItem) => typeItem.type.name); 
    }).catch(function(e) {
      console.error(e);
    });
  }

  // Function to add a list item for a single Pokémon
  function addListItem(pokemon) {
    let listItem = document.createElement('li'); // Creating a new <li> element
    let button = document.createElement('button'); // Creating a new button element
    button.innerText = pokemon.name; // Setting the button's text to the Pokémon's name
    button.classList.add('pokemon-button'); // Adding a class to the button

       // Add event listener to the button
       button.addEventListener('click', function() {
        showDetails(pokemon); 
      });
    
    // Appending the button to the list item
    listItem.appendChild(button);
    
    // Appending the list item to the Pokémon list
    let pokemonListElement = document.querySelector('.pokemon-list'); // Selecting the ul element
    pokemonListElement.appendChild(listItem); // Appending the list item to the ul
  }

  // Show details when a Pokemon is clicked
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }

  // Return an object exposing the getAll, add, addListItem, loadListfunctions and loadDetails functions
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

//Load the list of Pokemon from API and display them
pokemonRepository.loadList().then(function() { // Using loadList() to get the Pokémon
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon); // Using the addListItem function
  });
});






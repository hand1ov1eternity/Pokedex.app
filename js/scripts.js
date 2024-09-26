// IIFE to encapsulate pokemonList
let pokemonRepository = (function() {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 7,
      types: ['grass', 'poison']
    },
    {
      name: 'Charmander',
      height: 6,
      types: ['fire']
    },
    {
      name: 'Squirtle',
      height: 5,
      types: ['water']
    }
  ];

  // Function to return all items in pokemonList
  function getAll() {
    return pokemonList;
  }

  // Function to add a new item to pokemonList
  function add(pokemon) {
    if (typeof pokemon === 'object' && pokemon.name && pokemon.height && pokemon.types) {
      pokemonList.push(pokemon);
    } else {
      console.log('Invalid Pokemon entry. Please provide a valid object with name, height, and types.');
    }
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

  // Return an object exposing the getAll, add, and addListItem functions
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };
})();

// Adding new Pokémon to the repository
pokemonRepository.add({
  name: 'Pikachu',
  height: 4,
  types: ['electric']
});

// Looping through pokemonList and adding each item to the list
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon); // Using the addListItem function
});

// Verify the new Pokémon is added
console.log(pokemonRepository.getAll());
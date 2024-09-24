//IIFE to encapsulate pokemonList
let pokemonRepository = (function(){
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

//Funktion to return all items in pokemonList
function getAll() {
  return pokemonList;
}

//Funktion to add a new item to pokemonList
function add(pokemon) {
  if (typeof pokemon === 'object' && pokemon.name && pokemon.height && pokemon.types) {
    pokemonList.push(pokemon);
  }else {
    console.log('Invalid Pokemon entry. Please provide a valid object with name, height, and types.')
  }
}

//Return an object exposing the getAll and add functions
return {
  getAll: getAll,
  add: add
};
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height > 6) {
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that’s big! </p>');
  } else {
    document.write('<p>' + pokemon.name + '(height: ' + pokemon.height + ')</p>');
  }
});

//Adding new Pokemon to the repository
pokemonRepository.add({
  name:'Pikachu',
  height: 4,
  types: ['electric']
});

//Verify the new Pokemon is added
console.log(pokemonRepository.getAll());
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

pokemonList.forEach(function(pokemon) {
  if (pokemon.height > 6) {
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that’s big! </p>');
  } else {
    document.write('<p>' + pokemon.name + '(height: ' + pokemon.height + ')</p>');
  }
});
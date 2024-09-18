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

// Loop through each Pokémon in the pokemonList array
for (let i = 0; i < pokemonList.length; i++) {
  // Store the current Pokémon in a variable for easier access
  let pokemon = pokemonList[i];
  
  // Write the Pokémon's name and height to the document
  if (pokemon.height > 6) {
    // If the Pokémon's height is greater than 6, add a special note
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that’s big!</p>');
  } else {
    // Otherwise, just display the Pokémon's name and height without any special note
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')</p>');
  }
}
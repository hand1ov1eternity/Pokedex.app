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
  
        function loadDetails(pokemon) {
            let url = pokemon.detailsUrl;
            return fetch(url).then(function(response) {
                return response.json();
            }).then(function(details) {
                // Add the details to the pokemon
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types.map((type) => type.type.name).join(', ');
            }).catch(function(e) {
                console.error(e);
            });
        }
  
        return {
            getAll: getAll,
            add: add,
            loadList: loadList,
            loadDetails: loadDetails
        };
    })();
  }
  
  // Function to show details of a selected Pokémon in the modal
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      let modalTitle = document.querySelector('.modal-title');
      let modalBody = document.querySelector('.modal-body');
      
      modalTitle.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      modalBody.querySelector('.modal-image').src = pokemon.imageUrl;
      modalBody.querySelector('.modal-details').innerHTML = `
        <strong>Height:</strong> ${pokemon.height * 10} cm<br>
        <strong>Type(s):</strong> ${pokemon.types}
      `;
      
      $('#pokemonModal').modal('show'); // Show the modal using Bootstrap
    });
  }
  
  // Function to add a Pokémon as a list item
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
  
    let button = document.createElement('button');
    button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.classList.add('btn', 'btn-primary', 'pokemon-button');
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }
  
  // Function to filter and display Pokémon based on search
  function filterPokemon(searchQuery) {
    let pokemonList = document.querySelector('.pokemon-list');
    pokemonList.innerHTML = ''; // Clear the current list
  
    pokemonRepository.getAll().forEach(function(pokemon) {
      if (pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        addListItem(pokemon);
      }
    });
  }
  
  // Add event listener to search input
  let searchInput = document.querySelector('#search-input');
  searchInput.addEventListener('input', function() {
    let searchQuery = searchInput.value;
    filterPokemon(searchQuery);
  });
  
  // Load and display Pokémon when the page is loaded
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      addListItem(pokemon);
    });
  });
  





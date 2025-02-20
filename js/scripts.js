let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; // Get up to 150 Pokémon

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === 'object' && pokemon.name && pokemon.detailsUrl) {
            pokemonList.push(pokemon);
        } else {
            console.log('Invalid Pokémon entry.');
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
            // Once the list is loaded, render all Pokémon
            renderPokemons();
        }).catch(function(e) {
            console.error(e);
        });
    }

    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types.map(typeInfo => typeInfo.type.name).join(', ');
            pokemon.abilities = details.abilities.map(abilityInfo => abilityInfo.ability.name).join(', '); // Get abilities
        }).catch(function(e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            let modalTitle = document.querySelector('#pokemonModalLabel');
            let modalBody = document.querySelector('.modal-body');
            modalTitle.innerText = pokemon.name;
            modalBody.innerHTML = `
                <img class="modal-image" src="${pokemon.imageUrl}" alt="${pokemon.name}" style="width: 100%;">
                <p>Height: ${pokemon.height}</p>
                <p>Types: ${pokemon.types}</p>
                <p>Abilities: ${pokemon.abilities}</p> <!-- Display abilities -->
            `;
            $('#pokemonModal').modal('show'); // Show the modal
        });
    }

    function addListItem(pokemon) {
        let pokemonListElement = document.querySelector('.pokemon-list');
        let listItem = document.createElement('div');
        listItem.classList.add('col-md-3', 'mb-4'); // 4 columns per row

        let button = document.createElement('button');
        button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Capitalize the first letter
        button.classList.add('pokemon-button', 'btn', 'btn-primary', 'w-100'); // Full width button

        button.addEventListener('click', function() {
            showDetails(pokemon);
        });

        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
    }

    function renderPokemons() {
        let pokemonListElement = document.querySelector('.pokemon-list');
        pokemonListElement.innerHTML = ''; // Clear existing list

        // Load all Pokémon
        for (let i = 0; i < pokemonList.length; i++) {
            addListItem(pokemonList[i]);
        }
    }

    function filterPokemons() {
        let searchInput = document.getElementById('search-input');
        let filter = searchInput.value.toLowerCase();
        let filteredList = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(filter));
        return filteredList;
    }

    function renderFilteredPokemons() {
        let pokemonListElement = document.querySelector('.pokemon-list');
        pokemonListElement.innerHTML = ''; // Clear existing list
        let filteredList = filterPokemons();

        for (let i = 0; i < filteredList.length; i++) {
            addListItem(filteredList[i]);
        }
    }

    // Set up event listeners
    document.getElementById('search-input').addEventListener('input', renderFilteredPokemons);

    // Initial load
    loadList();

    return {
        getAll: getAll,
        add: add,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
})();

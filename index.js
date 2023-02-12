/* IIFE to prevent globalness */
    let pokemonRepository = (function() {
        let pokemonList = [];
        let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=200";
        let loadingMessage = document.querySelector(".lds-dual-ring");
    
        /* SearchButton() and searchByName() allows user to filter through pokemons */
        let searchButton = $(".btn-search");
        searchButton.on("click", function() {
            let userPokemonList = $(".pokemon-list");
            userPokemonList.empty();
            searchByName($(".form-control").val()).forEach(function(pokemon) {
                addListItem(pokemon);
            });
        })

        function searchByName(search) {
            return pokemonList.filter(function(pokemon) {
                return pokemon.name.toLowerCase().includes(search.toLowerCase());
            });
        }
    
        /* add() makes sure an actual pokemon is added to the array */
        function add(pokemon) {
            if (typeof pokemon === "object" && "name" in pokemon && "detailsUrl" in pokemon) {
                pokemonList.push(pokemon);
            } else {
                console.log("This is not a real pokemon object");
            }
        }

        /* addListItem()  displays list item as a button and invokes showDetails()
        to display pokemon results */
        function addListItem(pokemon) {
            let userPokemonList = $(".pokemon-list");
            let listItem = $('<li class="group-list-item"></li>');
            let button = $(`<button type="button" class="pokemon-button btn btn-primary" 
                data-toggle="modal" data-target="#pokemonModal">${pokemon.name}</button>`);
    
            listItem.append(button);
            userPokemonList.append(listItem);
    
            button.on("click", function() {
                showDetails(pokemon);
            });
        }

        /* showDetails() prints loaded pokemon details within modal */
            function showDetails(pokemon) {
                loadDetails(pokemon).then(function() {
                    showModal(pokemon);
            });
        }
    
        /* loadList() fetches all of array items from the API */
        function loadList() {
            displayMessage();
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
            }).finally(function() {
                removeMessage();
            });
        }

        /* loadDetails() serves to load specific details about a pokemon item and 
        obtains information from the API URL */
        function loadDetails(item) {
            let url = item.detailsUrl;
            return fetch(url).then(function(response) {
                return response.json();
            }).then(function(details) {
                item.frontImageUrl = details.sprites.front_default;
                item.backImageUrl = details.sprites.back_default;
                item.height = details.height;
                item.types = details.types;
            }).catch(function(e) {
                console.error(e);
            });
        }

        /* showModal() is responsible for the modal view */
        function showModal(pokemon) {
            let types = "";
            pokemon.types.forEach(function(type) {
                types += type.type.name + " ";
            });
    
            let modalTitle = $(".modal-title");
            let modalBody = $(".modal-body");
    
            modalTitle.empty();
            modalBody.empty();
    
            modalTitle.append(pokemon.name);
            modalBody.append(`<img class="modal-img" src="${pokemon.frontImageUrl}">`);
            modalBody.append(`<img class="modal-img" src="${pokemon.backImageUrl}">`);
            modalBody.append(`<p>Height: ${pokemon.height}</p>`);
            modalBody.append(`<p>Type(s): ${types}</p>`);
        }

       /* This function displays a message while content is loading*/
        function displayMessage() {
            loadingMessage.classList.remove("lds-dual-ring-hidden");
            loadingMessage.classList.add("lds-dual-ring-visible");
        }
    
        /* This function hides loading message after content is loaded */
        function removeMessage() {
            loadingMessage.classList.remove("lds-dual-ring-visible");
            loadingMessage.classList.add("lds-dual-ring-hidden");
        }
    
       /* loadEverything() ties all the functions in one and is called outside the IIFE */
        function loadEverything() {
            loadList().then(function() {
                getAll().forEach(function(pokemon) {
                    addListItem(pokemon);
                });
            });
        }
    
         /* getAll() returns the entire array of objects */
         function getAll() {
            return pokemonList;
        }

        return {
            getAll: getAll,
            add: add,
            searchByName: searchByName,
            addListItem: addListItem,
            loadList: loadList,
            loadDetails: loadDetails,
            showDetails: showDetails,
            showModal: showModal,
            loadEverything: loadEverything,
        };
    })();
    
    pokemonRepository.loadEverything();
    
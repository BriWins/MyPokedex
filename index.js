/* IIFE to prevent globalness */
let pokemonRepository = (function () {
    const pokemonList = [];
    const apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    let fullPokemonList = $()
    
    /* loadList() fetches the api detals and passes to loadDetails() */
    function loadList() {
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsURL: item.url,
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    /* user can search pokemons by name */
    let searchButton = $(".search-btn");
    searchButton.on("click", function() {
        filterPokemonList = $(".pokemon-list");
        filterPokemonList.empty();
        searchByName($(".form-control").val()).forEach(function(pokemon) {
            addListItem(pokemon);
        });
    })

    function searchByName(search) {
        return pokemon.name.toLowerCase().includes(search.toLowerCase());
    }

    /* loadDetails() works with loadList() to get pokemon details */
    function loadDetails(item) {
        let url = item.detailsURL;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // iterates through arrays types and get type name
            item.types = [];
            details.types.forEach(function (itemType) {
                item.types.push(itemType.type.name);
            });
            //details will now be added to item
            item.imageFrontUrl = details.sprites.front_default;
            item.imageBackUrl = details.sprites.back_default;
            item.height = details.height;
        }).catch(function (e) {
            console.error(e);
        });
    }

    /* add() adds a new pokemon item into array */
    function add(pokemon) {
         if ( typeof pokemon === "object" && "detailsURL" in pokemon) { /*make sure item is actual object*/
        return pokemonList.push(pokemon);
         } else {
            console.log("This is not an object!");
        }
    }

    /* getAll() returns each item in array */
    function getAll() {
        return pokemonList;
    }
   

    /* USING JQUERY to showDetails() which executes when a user clicks a pokemon*/
    function showDetails(pokemon) {

        loadDetails(pokemon).then(function () {
        
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header");

        modalBody.empty();
        modalTitle.empty();

        let titleElement = $("<h1>" + pokemon.name + "</h1>");

        let frontImg = $('<img class="modal-img" style="width:50%">')
        frontImg.attr("src", pokemon.imageFrontUrl);

        let backImg = $('<img class="modal-img" style="width:50%">')
        backImg.attr("src", pokemon.imageBackUrl);

        let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");

        let typesElement = $("<p>" + "Types: " + pokemon.types + "</p>");

        modalTitle.append(titleElement);
        modalBody.append(frontImg);
        modalBody.append(backImg);
        modalBody.append(heightElement);
        modalBody.append(typesElement);
    }

)}

/*  USING JQUERY to addListItem() which displays array list as a button*/
function addListItem(pokemon) {
    let thePokemonList = $(".pokemon-list");
    let listItem = $('<li class="group-list-item"></li>');
    let button = $(`<button type="button" class="pokemon-btn btn btn-primary" data-toggle="modal" data-target="#pokemonModal">${pokemon.name}</button>`);

    listItem.append(button);
    thePokemonList.append(listItem);

    button.on("click", function() {
        showDetails(pokemon);
    });
}

    /* hides modal on demand */
    //   function hideModal() {
    //     modalContainer.classList.remove("is-visible");
    // }
   
    /* modal closes if user presses esc key */
    // window.addEventListener("keydown", (e) => {
    //     if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
    //         hideModal();
    //     };
    // })

    /* closes modal if user click on the overlay */
    //  modalContainer.addEventListener("click", (e) => {
    //     let target = e.target;
    //     if (target === modalContainer) {
    //         hideModal();
    //     }
    //  });
      
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        searchByName:searchButton,
    }; 
})();

pokemonRepository.loadList().then(function() {
    /* forEach() loop returns array items outside of expression by using getAll() */
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);  // this function  is called from within expression
    });
});

/* addListItem() displays array list as a button*/
    // function addListItem(pokemon){
    //     const listDisplay = document.querySelector(".pokemon-list");
    //     const listItem = document.createElement("li");
    //     let button = document.createElement("button");
    //     button.innerText = pokemon.name;
    //     button.classList.add("btn-display");
    //     listItem.appendChild(button);
    //     listDisplay.appendChild(listItem);
    //     button.addEventListener("click", function(event) {
    //         showDetails(pokemon);
    //     });
    // }

/* showDetails() executes when a user clicks a pokemon*/
    // function showDetails(pokemon) {
    //     loadDetails(pokemon).then(function () {
    //     /* clear modal container */
    //     modalContainer.innerHTML = "";

    //     let modal = document.createElement("div");
    //     modal.classList.add("modal");

    //     let closeButton = document.createElement("button");
    //     closeButton.classList.add("modal-close");
    //     closeButton.innerText = "X";
    //     closeButton.addEventListener("click", hideModal);

    //     let titleElement = document.createElement("h1");
    //     titleElement.innerText = pokemon.name;

    //     let frontImgElement = document.createElement("img");
    //     frontImgElement.classList.add("front-img");
    //     frontImgElement.src = pokemon.imageFrontUrl;

    //     let backImgElement = document.createElement("img");
    //     backImgElement.classList.add("back-img");
    //     backImgElement.src = pokemon.imageBackUrl;

    //     let contentElement = document.createElement("p");
    //     contentElement.innerText = ("Height: " + pokemon.height + " meters" + "\n" + "\n" + "Type(s): " + pokemon.types.join(", "));

    //     modal.appendChild(closeButton);
    //     modal.appendChild(titleElement);
    //     modal.appendChild(frontImgElement);
    //     modal.appendChild(backImgElement);
    //     modal.appendChild(contentElement);
    //     modalContainer.appendChild(modal);

    //     modalContainer.classList.add("is-visible");
    //     });
    // }


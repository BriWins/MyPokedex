/* IIFE to prevent globalness */
let pokemonRepository = (function () {
  
    const pokemonList = [];
    const apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    
    /* loadList() fetches the api detals and passes to loadDetails() */
    function loadList() {
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsURL: item.url 
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    /* loadDetails() works with loadList() to get pokemon details */
    function loadDetails(item) {
        const url = item.detailsURL;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (detailsURL) {
            //details will now be added to item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = detial.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    /* add() adds a new pokemon item into array */
    function add(pokemon) {
        // if (pokemon.typeof === Object) { /*make sure item is actual object*/
        return pokemonList.push(pokemon);
        // } else {
        // console.log("This is not an object!");
        // }
    }

    /* getAll() returns each item in array */
    function getAll() {
        return pokemonList;
    }
   
/* addListItem() displays array list as a button*/
    function addListItem(pokemon){
        const listDisplay = document.querySelector(".pokemon-list");
        const listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("btn-display");
        listItem.appendChild(button);
        listDisplay.appendChild(listItem);
        listenForClick();
    }

/* showDetails() executes when a user clicks a pokemon*/
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

/* listenForClick() listening for clicks on button that will display a pokemon item */
    function listenForClick(pokemon) {
        let button = document.querySelector("button")
        button.addEventListener("click", function (event) {
            let target = event.target;
            target.classList("btn-display");
            showDetails(pokemon);
        })
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        listenForClick: listenForClick,
        loadList, loadList,
        loadDetails: loadDetails,
    }; 
})();

pokemonRepository.loadList().then(function() {
    /* forEach() loop returns array items outside of expression by using getAll() */
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);  // this function  is called from within expression
    });
 
});


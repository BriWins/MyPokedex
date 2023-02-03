/* IIFE to prevent globalness */
let pokemonRepository = (function () {
  
    const pokemonList = [
        {name: "Pikachu", height: 1, type: ["static","lighteningrod"]},
        {name: "Pidgeot", height: 0.5, type: ["tackle","twister"]},
        {name: "Pichu", height: 0.3, type: ["kindness","charm"]}
    ];
    
    /* add() adds a new pokemon item into array */
    function add(pokemon) {
        if (pokemon.typeof === Object.keys(pokemonList)) { /*make sure item is actual object*/
        return pokemonList.push(pokemon);
        } else {
        console.log("This is not an object!");
        }
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
        button.classList.add("btn-styling");
        listItem.appendChild(button);
        listDisplay.appendChild(listItem);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
    }; 
})();

/* forEach() loop returns array items outside of expression by using getAll() */
pokemonRepository.getAll().forEach(function(pokemon) {
   pokemonRepository.addListItem(pokemon);  // calls needed function from within expression
});


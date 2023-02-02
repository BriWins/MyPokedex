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
   
    return {
        add: add,
        getAll: getAll,
    };
    
})();

/* forEach() loop returns array items outside of expression */
pokemonRepository.getAll().forEach(function(pokemon) {
    if ( pokemon.height >= 1 ) {
        document.write("</p> Name: " + pokemon.name  + " " + "Height: " + pokemon.height + "- thats one big ole pokemon! </br>");
    } else {
        document.write("</p> Name: " + pokemon.name  + " " + "Height: " + pokemon.height + " </br>");
}});


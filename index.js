/* Testing */

const pokemonList = [
    {name: "Pikachu", height: 1, type: ["static","lighteningrod"]},
    {name: "Pidgeot", height: 0.5, type: ["tackle","twister"]},
    {name: "Pichu", height: 0.3, type: ["kindness","charm"]}
];

for ( let i = 0; i < pokemonList.length; i++ ) {
  
    if ( pokemonList[i].height >= 1 ) {
        document.write("Name: " + pokemonList[i].name  + " " + "Height: " + pokemonList[i].height + "- thats one big ole pokemon! </br>");
    } else {
        document.write("Name: " + pokemonList[i].name  + " " + "Height: " + pokemonList[i].height + " </br>");
    }
}
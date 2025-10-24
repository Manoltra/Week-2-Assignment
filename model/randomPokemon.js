// Updated randomPokemon.js to allow adding new Pokemon
const pokemonList = [
  'Pikachu', 'Charmander', 'Bulbasaur', 'Squirtle', 'Jigglypuff',
  'Meowth', 'Psyduck', 'Snorlax', 'Eevee', 'Gengar', 'Vapreon', 'Excadrill'
];

function getRandomPokemon() {
  const randomIndex = Math.floor(Math.random() * pokemonList.length);
  return pokemonList[randomIndex];
}

function addPokemon(pokemonName) {
  if (pokemonName && !pokemonList.includes(pokemonName)) {
    pokemonList.push(pokemonName);
  }
}

module.exports = { getRandomPokemon, addPokemon };
const { getRandomPokemon } = require('./randomPokemon');

function generatePokemonTeam() {
  return Array.from({ length: 6 }, () => Math.random() > 0.5 ? getRandomPokemon() : 'None');
}

module.exports = { generatePokemonTeam };
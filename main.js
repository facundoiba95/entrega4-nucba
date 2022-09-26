const requestApi = async (pokemon) => {
    const URLbase = `https://pokeapi.co/api/v2/pokemon/`
    const conexion = await fetch(URLbase+pokemon)
    .then(response => response.json())
    .catch(reject => console.log(reject));

    return conexion;
}

const form = document.querySelector('.form')
const input = document.querySelector('.inputPokemon')
const btnBuscar = document.querySelector('.btnBuscar')
const cardsContainer = document.querySelector('.cards-container')
const message = document.querySelector('.message')
const card = document.getElementById('card')

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

let pokemones = [];

const searchPokemon = async e => {
    e.preventDefault();
    const inputValue = input.value.trim();
    const fetchedPokemon = await requestApi(inputValue);
   
    if(!inputValue.length){
        message.textContent = 'El campo esta vacio! '
        message.style.display ='block'
        return;
    } else if(!fetchedPokemon){
        message.textContent= 'Ingresar Numero Valido'
        message.style.display ='block'
        return;
    }else if(
        pokemones.some(pokemon => pokemon.id === fetchedPokemon.id)
    ){
        message.textContent = 'Ya buscaste este Pokemon!'
        message.style.display ='block'
        return;
    } else {
        pokemones = [fetchedPokemon]
    }
    
    message.style.display ='none'
    renderCreateHtmlCards(pokemones);
    setCardColor(pokemones)
    
}

const setCardColor = array => {
    const color = typeColors[array[0].types[0].type.name];
    cardsContainer.style.backgroundColor = `${color}`;
} 


const renderCreateHtmlCards = array => {
    cardsContainer.innerHTML = array.map(pokemon => createHtmlCards(pokemon)).join('')

}

const altura = altura => medida = altura /10
const peso = peso =>  medida = peso /10

const createHtmlCards = array => {
    const imagePokemonUno = array.sprites.other.dream_world.front_default ? array.sprites.other.dream_world.front_default : array.sprites.other.home.front_default ;
    const moves = array.moves[7].move.name ? array.moves[7].move.name : array.moves;
  
    return`
    <div class="cardPokemon" >
    <h3 class="id">${array.id}</h3>
         <div class="header-card-container">
             <h3 class="name">${array.name.toUpperCase()}</h3>
             <p class="type">Type: ${array.types[0].type.name}</p>
             <span class="hp-info">
                 <p>HP</p>
                 <h2 class="hp">${array.stats[0].base_stat}</h2>
             </span>
         </div>
         <div class="galeria-container">
            <img src="${imagePokemonUno}" alt="" class="imgPrincipal"> 
            <h2 class="ability">${array.abilities[0].ability.name.toUpperCase()}</h2>
         </div>
         <div class="info-container">
             <span class="move">Moves: ${moves}</span>
             <div class="stats">
                 <h4 class="attack"><i class="fa-solid fa-burst"></i>Attack: ${array.stats[1].base_stat}</h4>
                 <h4 class="defense"><i class="fa-solid fa-shield"></i>Defense: ${array.stats[2].base_stat}</h4>
                 <h4 class="speed"><i class="fa-solid fa-wind"></i>Speed: ${array.stats[5].base_stat}</h4>
                 <p class="peso">Height: ${altura(array.height)}M</p>
                 <p class="kilos">Weight: ${peso(array.weight)}Kg</p>
             </div>
             
         </div>
    </div>
    `
}





const init =() => {
form.addEventListener('submit', searchPokemon)
message.style.display = 'none'
}

init();
const pokemonNum = document.querySelector('.pokemon_num');
const pokemonName = document.querySelector('.pokemon_nam');
const pokemonImg = document.querySelector('.pokemon_img');
const form = document.querySelector('.form');
const pesquisa = document.querySelector('.input_seach');

const botaoPrev = document.querySelector('.voltar');
const botaoNext = document.querySelector('.proximo');

let procuraPokemon = 1;

const imagens = [
    "pokedex/pokedex1.jpg",
    "pokedex/pokedex2.jpg",
    "pokedex/pokedex3.jpg",
    "pokedex/pokedex4.jpg",
]

let index = 0;

function alterarImagem() {
    const imagem = document.getElementById("imagem");
    index = (index + 1) % imagens.length;
    imagem.src = imagens[index];
}

const fetchPokemon = async (pokemon) => {
    const APIResponde = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponde.status === 200) {
        const data = await APIResponde.json();
        return data;
    }
    
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'carregando...';

    const data = await fetchPokemon(pokemon);
    if(data) {
        pokemonImg.computedStyleMap.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNum.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        pesquisa.value = '';
            procuraPokemon = data.id;
    } else {
        pokemonImg.computedStyleMap.display = 'none';
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNum.innerHTML = '';
        pesquisa.value = '';
    }
}

form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(pesquisa.value.toLowerCase());
})

botaoPrev.addEventListener('click', () => {
    if (procuraPokemon > 1) {
     procuraPokemon -= 1;
     renderPokemon(procuraPokemon);
    }    
 })
 
 botaoNext.addEventListener('click', () => {
     procuraPokemon += 1;
     renderPokemon(procuraPokemon);
 })
 
 renderPokemon(procuraPokemon);





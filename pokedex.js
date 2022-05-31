////////////////////////////////////////////////////////////////////////
// API

const pokedex$$ = document.getElementById("pokedex");
const ALL_POKEMONS = [];
const TYPES = [
  "all",
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
  "unknown",
  "shadow",
];
////////////////////////////////////////////////////////////////////////
// RECIBIR DATOS API

const getAllPokemons = () => {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=386")
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((error) =>
      console.log("Error obteniendo todos los pokemons", error)
    );
};

const getIndividualPokemon = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      const pokemon = {
        name: response.name,
        id: response.id,
        type: response.types.map((type) => type.type.name),
        image: response.sprites.other["official-artwork"].front_default,
        weight: response.weight,
        height: response.height,
      };
      return pokemon;
    })
    .catch((error) =>
      console.log("Error obteniendo todos los pokemons", error)
    );
};

////////////////////////////////////////////////////////////////////////
// DIBUJAR POKÉDEX
const drawPokemons = (pokemons) => {
  const myTimeout = setTimeout(loadPokemons, 2000);
  function loadPokemons() {
    pokedex$$.innerHTML = "";
    pokemons.forEach((poke) => {
      const li = document.createElement("li");
      li.classList.add("card");
      const html = `
              <img class="card-image" src=${poke.image} alt=${poke.name}>
              <p class="card-title">${poke.name}   #${poke.id}<p>
              <div class="card-subtitle">Tipo: ${poke.type[0]} ${
        poke.type[1] ? `, ${poke.type[1]}` : ""
      }</div>
              <p>Peso: ${poke.weight / 10} Kg</p>
              <p>Altura: ${poke.height / 10} m</p>
          `;
      li.innerHTML = html;
      pokedex$$.appendChild(li);
    });
  }
};

////////////////////////////////////////////////////////////////////////
//NAV BUSCAR POR ID Y NOMBRE
const filter = (event) => {
  const inputValue = event.target.value.toLowerCase();
  const filtered = ALL_POKEMONS.filter((pokemon) => {
    const matchName = pokemon.name.toLowerCase().includes(inputValue);
    const matchId = pokemon.id === Number(inputValue);
    return matchName || matchId;
  });
  drawPokemons(filtered);
};

const addAllMyEventsListeners = () => {
  document.getElementById("input-search").addEventListener("input", filter);
};


////////////////////////////////////////////////////////////////////////
//NAV BUSCAR POR TIPOS
const filterByType = (event) => {
  const typeToFilter = event.target.classList[0];
  if (typeToFilter === "all") {
    return drawPokemons(ALL_POKEMONS);
  }
  const filtered = ALL_POKEMONS.filter((pokemon) => {
    const matchType = pokemon.type.includes(typeToFilter);
    return matchType;
  });
  drawPokemons(filtered);
};

const drawTypesButtons = () => {
  const typesContainer$$ = document.querySelector(".types");
  TYPES.forEach((type) => {
    const span = document.createElement("span");
    span.classList.add(type);
    span.addEventListener("click", filterByType);
    span.innerText = type;
    typesContainer$$.appendChild(span);
  });
};

// POKÉDEX SEARCH
// NAV BUSCAR POR POKÉDEX

//POKÉDEX TODAS
const drawTodasPokemons = () => {
  const pokedexTodasSL = ALL_POKEMONS.slice(0, 386);
  console.log(pokedexTodasSL);
  drawPokemons(pokedexTodasSL, pokedex$$);
};
const pokedexTodas = document.getElementById("pokedex-todas");
pokedexTodas.addEventListener("click", drawTodasPokemons);

//POKÉDEX KANTO
const drawKantoPokemons = () => {
  const pokedexKantoSL = ALL_POKEMONS.slice(0, 151);
  console.log(pokedexKantoSL);
  drawPokemons(pokedexKantoSL, pokedex$$);
};
const pokedexKanto = document.getElementById("pokedex-kanto");
pokedexKanto.addEventListener("click", drawKantoPokemons);

//POKÉDEX JOHTO
const drawJohtoPokemons = () => {
  const pokedexJohtoSL = ALL_POKEMONS.slice(151, 251);
  console.log(ALL_POKEMONS);
  console.log(pokedexJohtoSL);
  drawPokemons(pokedexJohtoSL, pokedex$$);
};
const pokedexJohto = document.getElementById("pokedex-johto");
pokedexJohto.addEventListener("click", drawJohtoPokemons);

//POKÉDEX HOENN
const drawHoennPokemons = () => {
  const pokedexHoennSL = ALL_POKEMONS.slice(251, 386);
  console.log(pokedexHoennSL);
  drawPokemons(pokedexHoennSL, pokedex$$);
};
const pokedexHoenn = document.getElementById("pokedex-hoenn");
pokedexHoenn.addEventListener("click", drawHoennPokemons);

////////////////////////////////////////////////////////////////////////
// START API
const startPokedex = async () => {
  addAllMyEventsListeners();
  drawTypesButtons();
  const allPokemons = await getAllPokemons();
  for (const pokemon of allPokemons) {
    const pokemonInfo = await getIndividualPokemon(pokemon.url);
    ALL_POKEMONS.push(pokemonInfo);
  }
  console.log(ALL_POKEMONS);
  drawPokemons(ALL_POKEMONS);
};

startPokedex();

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
const drawPokemons = (pokemons) => {
  const myTimeout = setTimeout(loadPokemons, 3000);
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
const drawTodasPokemons = () => {
  const pokedexTodasSpl = ALL_POKEMONS.slice(0, 386);
  console.log(pokedexTodasSpl);
  drawPokemons(pokedexTodasSpl, pokedex$$);
};
const pokedexTodas = document.getElementById("pokedex-todas");
pokedexTodas.addEventListener("click", drawTodasPokemons);



const drawKantoPokemons = () => {
  const pokedexKantoSpl = ALL_POKEMONS.slice(0, 151);
  console.log(pokedexKantoSpl);
  drawPokemons(pokedexKantoSpl, pokedex$$);
};
const pokedexKanto = document.getElementById("pokedex-kanto");
pokedexKanto.addEventListener("click", drawKantoPokemons);



const drawJohtoPokemons = () => {
  const pokedexJohtoSpl = ALL_POKEMONS.slice(151, 251);
  console.log(ALL_POKEMONS);
  console.log(pokedexJohtoSpl);
  drawPokemons(pokedexJohtoSpl, pokedex$$);
};
const pokedexJohto = document.getElementById("pokedex-johto");
pokedexJohto.addEventListener("click", drawJohtoPokemons);



const drawHoennPokemons = () => {
  const pokedexHoennSpl = ALL_POKEMONS.slice(251, 386);
  console.log(pokedexHoennSpl);
  drawPokemons(pokedexHoennSpl, pokedex$$);
};
const pokedexHoenn = document.getElementById("pokedex-hoenn");
pokedexHoenn.addEventListener("click", drawHoennPokemons);





//const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
//KANTO POKÉDEX
/*const kantoPokedex = async () => {
  for (let i = 1; i <= 151; i++) {
    const res = await fetch(`${pokeUrl}${i}`);
    const resJson = await res.json();
    ALL_POKEMONS.push(resJson);
  }
  drawKantoPokemons();
};

const drawKantoPokemons = () => {
  pokedex$$.innerHTML = "";
  for (let i = 0; i <= 151; i++) {
    const pokemon = ALL_POKEMONS[i];
    drawPokemons(pokemon, pokedex$$);
  }
};

const pokedexKanto = document.getElementById("pokedex-kanto");
pokedexKanto.addEventListener("click", drawKantoPokemons);

//JOHTO POKÉDEX
const johtoPokedex = async () => {
  for (let i = 152; i <= 251; i++) {
    const res = await fetch(`${pokeUrl}${i}`);
    const resJson = await res.json();
    ALL_POKEMONS.push(resJson);
  }
  drawJohtoPokemons();
};

const drawJohtoPokemons = () => {
  pokedex$$.innerHTML = "";
  for (let i = 152; i <= 251; i++) {
    const pokemon = ALL_POKEMONS[i];
    drawPokemons(pokemon, pokedex$$);
  }
};

const pokedexJohto = document.getElementById("pokedex-johto");
pokedexJohto.addEventListener("click", drawJohtoPokemons);

//HOENN POKÉDEX
const hoennPokedex = async () => {
  for (let i = 252; i <= 386; i++) {
    const res = await fetch(`${pokeUrl}${i}`);
    const resJson = await res.json();
    ALL_POKEMONS.push(resJson);
  }
  drawHoennPokemons();
};

const drawHoennPokemons = () => {
  pokedex$$.innerHTML = "";
  for (let i = 252; i <= 386; i++) {
    const pokemon = ALL_POKEMONS[i];
    drawPokemons(pokemon, pokedex$$);
  }
};

const pokedexHoenn = document.getElementById("pokedex-hoenn");
pokedexHoenn.addEventListener("click", drawHoennPokemons);*/

//START CODE
const startMyCode = async () => {
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

startMyCode();

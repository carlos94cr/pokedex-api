/**
 * REQUISITOS
 * - Obtener div pokedex
 * - Obtener listado de todos los pokemons
 * - Mediante bucle obtener uno por uno cada pokemon con sus características
 * - Iterar sobre todos los pokemons e imprimirlos en consola
 * - Renderizar (pintar, añadir al DOM) los pokemons dentro del div pokedex
 *
 * FUNCIONALIDAD FILTRADO.
 * - Cada vez que el usuario teclee algo, se actualicen los resultados
 * - Cuando se produzca el evento "input", filtraremos sobre el array original.
 * - El resultado de ese filtro, se lo mandaremos a drawPokemons.
 */

const pokedex$$ = document.getElementById("pokedex");
const ALL_POKEMONS = []; // Una vez guardada, nunca la modificaremos. Solo para añadir mas.
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
  /**
   * Esta función va a recibir un listado de pokemons.
   * Primero, borrará todos los que haya en el elemento pokedex.
   * Luego añadirá un pokemon por cada elemento del array que reciba.
   */
  const myTimeout = setTimeout(loadPokemons, 3000);
  function loadPokemons() {
    pokedex$$.innerHTML = ""; // Borra todos los pokemons dentro de la pokedex
    pokemons.forEach((poke) => {
      // Con esto, pintaré cada pokemon en el DOM.
      const li = document.createElement("li");
      li.classList.add("card");
      const html = `
              <img class="card-image" src=${poke.image} alt=${poke.name}>
              <p class="card-title">${poke.name}<p>
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
  /**
   * ¿Tenemos un array con todos los pokemons? SI
   * ¿Tenemos el término que queremos buscar? SI
   * ¿Tenemos una función que si le mandamos un array nos pinta pokemons? SI
   * ¿Tenemos un método de array que filtra resultados? SI
   *
   * Map devuelve un array nuevo, con la misma longitud del array de entrada
   * Filter devuelve un array con los mismos o menos elementos que el array de entrada
   */
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

const startMyCode = async () => {
  addAllMyEventsListeners();
  drawTypesButtons();

  const allPokemons = await getAllPokemons(); // aquí esperará unos segundos a recibir los pokemons de la api

  for (const pokemon of allPokemons) {
    const pokemonInfo = await getIndividualPokemon(pokemon.url);
    ALL_POKEMONS.push(pokemonInfo);
  }
  console.log(ALL_POKEMONS);
  drawPokemons(ALL_POKEMONS);
};

startMyCode();

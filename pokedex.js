//VAR che richiama la lista in html
const listaPokemon = document.querySelector("#listapokemon");
const btnHeader = document.querySelectorAll(".btn-header");

//var che richiama in autom. l'url uguale per l'api
let URL = "https://pokeapi.co/api/v2/pokemon/";

//Tutti i pokemon
var pokemonAll = 1025;

for(var i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostraPokemon(data)) //il parametro data carica dati oggetto/pokemon con sue proprietà dall'api. Check console.log(data)
}

//funzione che mostra il pokemon al recupero del URL. Definisco cosa succede ad ogni iterazione di questa funzione.
async function mostraPokemon(poke) {

    //enter hashmap(python dictionary) = .map()
    let tipi = poke.types.map((type) =>
            `<p class= "${type.type.name} tipo" id = "${type.type.name}">${type.type.name}</p>`
    );
    tipi = tipi.join('');

    
    let pokeId = poke.id.toString();
    console.log(pokeId);
    if(pokeId.length === 1 ){
 
        pokeId = "00" + pokeId;
    }
    else if (pokeId.length === 2){
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div"); //crea elemento div
    div.classList.add("pokemon");
    div.innerHTML = `<p class="pokemon-num-back">#${pokeId}</p>
    <div class="pokemon-img">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}-official">
            <p class="sprites">
                <img src="${poke.sprites.front_default}" alt="${poke.name}-front">
                <img src="${poke.sprites.back_default}" alt="${poke.name}-back">
            </p>
    </div>
    <div class="pokemon-info">
        <div class="box-nome">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="nome-pokemon">${poke.name}</h2>
        </div>
        <div class="pokemon-tipo">
            ${tipi}
        </div>
        <div class="pokemon-stat">
            <p class="stat">${poke.height} M</p>
            <p class="stat">${poke.weight} KG</p>
        </div>
    </div>`;


    listaPokemon.append(div);

    
    //typeof() permette di vedere che variabile è l'elemento.
    console.log(typeof(tipi));
}

btnHeader.forEach(btn => btn.addEventListener('click', (event) => {
    var btnId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    //senza refetchare dati. Riprendere data come var che può essere passata a questa funzione. 
    //Prox step collegare eventlistener con filtro
    // var filtro = data.types.map(type => type.type.name)
    // if (event = filtro)
    //     {

    //     }

    for(var i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (btnId === "tutti") {
                    mostraPokemon(data);
                }

                var tipis = data.types.map((type)=> type.type.name);
                if (tipis.some(tipo => tipo.includes(btnId))) {
                    mostraPokemon(data);
                }
            })
    }


}))



// <p class="tipo" id = "normal">${poke.types[0]}</p>
//<p class="tipo" id = "fighting">${poke.types[1]}</p>
//  //OTTENERE TIPO POKEMON
//     //Accesso all'api succede fuori dalla funzione. Accesso all'array types:
//     var tipoArray = poke.types;

//     //creo array per salvare i nomi dei tipi
//     var tipoNome = [];
    
//     //ciclo su ogni elemento dell'array tipi:
//     for (var i = 0; i < tipoArray.length; i++){
//         //estrarre tipo e aggiungerlo a tipoNome:
//         tipoNome.push(tipoArray[i].type.name);
//     }

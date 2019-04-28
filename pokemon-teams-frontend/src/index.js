const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')


const getPokemons = () =>
  fetch(TRAINERS_URL)
  .then(resp => resp.json())

const createPokemon = pokemon => {
  return fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'trainer_id': pokemon
    })
  }).then(resp => resp.json())
}

const deletePokemon = id =>
  fetch(POKEMONS_URL + `/${id}`, {
    method: 'DELETE'
  }).then(resp => resp.json())

const addPokemon = (pokemon => {
  createPokemon(parseInt(event.target.dataset.trainerId))
    .then(pokemon => {
      const add = document.querySelector(`div[data-id='${pokemon["trainer_id"]}']`)
      const list = add.querySelector('ul')
      list.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    })
})

const renderPokemon = trainer => {
  const div = document.createElement('div')
  div.className = "card"
  div.dataset.id = trainer.id
  div.innerHTML = `
    <p>${trainer.name}</p>
    <button class="add_btn" data-trainer-id=${trainer.id}>Add Pokemon</button>
    <ul>
    </ul>
    `

  const ul = div.querySelector('ul')
  const p = trainer.pokemons

  for (let i = 0; i < p.length; i++) {
    const li = document.createElement("li")

    li.innerHTML = `${p[i].nickname} (${p[i].species}) <button class="release" data-pokemon-id=${p[i].id}>Release</button>`

    li.querySelector('button').addEventListener('click', () => {
      deletePokemon(p[i].id)
      li.remove()
    })
    ul.append(li)
  }

  addBtn = div.querySelector('button')
  addBtn.addEventListener('click', () => {
    addPokemon('2')
  })


  main.append(div)
}

const renderPokemons = trainers => {
  trainers.forEach(renderPokemon)
}

getPokemons()
  .then(renderPokemons)


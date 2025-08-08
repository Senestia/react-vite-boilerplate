import axios from "axios"

const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2"

const pokemonHttp = axios.create({
  baseURL: POKEMON_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

export default pokemonHttp

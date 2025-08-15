import axios, { type AxiosInstance } from "axios"
import {
  POKEMON_API_BASE_URL,
  WIZARD_API_BASE_URL,
} from "../constants/endpoint"

export function createHttpClient(baseURL: string): AxiosInstance {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
}

export const pokemonHttp: AxiosInstance = createHttpClient(POKEMON_API_BASE_URL)
export const wizardHttp: AxiosInstance = createHttpClient(WIZARD_API_BASE_URL)

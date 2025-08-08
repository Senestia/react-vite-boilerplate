export function PokemonHeader() {
  return (
    <header className="flex flex-col items-center gap-2 text-center">
      <h1 className="text-3xl font-semibold">Pokemon Explorer</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Browse a few Pokemon from the public PokeAPI.
      </p>
    </header>
  )
}

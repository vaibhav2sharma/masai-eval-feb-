import React, { useState, useEffect } from "react";
import useDebounce from "./useDebounce";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPokemons, setTotalPokemons] = useState(0);

  const pokemonsPerPage = 20;

  const debouncedValue = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchTotalCount() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1`);
        const data = await res.json();
        setTotalPokemons(data.count); // e.g. ~1281
        setTotalPages(Math.ceil(data.count / pokemonsPerPage));
      } catch (err) {
        console.error(err);
        setError("Could not retrieve total Pokémon count.");
      }
    }
    fetchTotalCount();
  }, []);

  useEffect(() => {
    if (debouncedValue) {
      return;
    }
    setLoading(true);
    setError("");
    async function fetchPokemons() {
      try {
        const offset = (currentPage - 1) * pokemonsPerPage;
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${offset}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch Pokémon list");
        }
        const data = await res.json();

        const detailPromises = data.results.map(async (p) => {
          const detailRes = await fetch(p.url);
          return detailRes.json();
        });
        const detailedPokemons = await Promise.all(detailPromises);
        setPokemonList(detailedPokemons);
      } catch (err) {
        console.error(err);
        setError("Error fetching Pokémon list.");
        setPokemonList([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemons();
  }, [currentPage, debouncedValue]);

  useEffect(() => {
    if (!debouncedValue) {
      setDebouncedSearchTerm("");
      return;
    }
    setDebouncedSearchTerm(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      return;
    }
    async function fetchSinglePokemon() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${debouncedSearchTerm.toLowerCase()}`
        );
        if (!res.ok) {
          throw new Error("Pokémon not found");
        }
        const data = await res.json();

        setPokemonList([data]);
      } catch (err) {
        console.error(err);
        setError(`No Pokémon found with the name "${debouncedSearchTerm}"`);
        setPokemonList([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSinglePokemon();
  }, [debouncedSearchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (!e.target.value) {
      setCurrentPage(1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Pokédex</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Pokémon by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Loading...</p>}

      <div className="pokemon-list">
        {!loading &&
          pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
      </div>

      {!debouncedSearchTerm && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
        />
      )}
    </div>
  );
}

export default App;

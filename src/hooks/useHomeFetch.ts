import { useState, useEffect, useRef } from "react";
import { isPersistantState } from "../helpers";
import API, { Movie } from "../API";

const initalState = {
  page: 0,
  results: [] as Movie[],
  total_pages: 0,
  total_results: 0,
};
export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(initalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isloadingMore, setIsloadingMore] = useState(false);

  const fetchMovies = async (page: number, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);
      const movies = await API.fetchMovies(searchTerm, page);
      console.log(movies);
      setState((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!searchTerm) {
      const sessionState = isPersistantState("HomeState");
      if (sessionState) {
        setState(sessionState);
        return;
      }
    }
    setState(initalState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!isloadingMore) return;
    fetchMovies(state.page + 1, searchTerm);
    setIsloadingMore(false);
  }, [isloadingMore, searchTerm, state.page]);

  //Write to session sessionStorage

  useEffect(() => {
    if (!searchTerm) {
      sessionStorage.setItem("HomeState", JSON.stringify(state));
    }
  }, [searchTerm, state]);

  return {
    state: state,
    loading: loading,
    error: error,
    setSearchTerm: setSearchTerm,
    searchTerm: searchTerm,
    setIsloadingMore: setIsloadingMore,
  };
};

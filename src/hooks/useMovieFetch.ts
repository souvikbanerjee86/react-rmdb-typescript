import { useState, useEffect } from "react";
import { isPersistantState } from "../helpers";
import API, { Movie, Cast, Crew } from "../API";

export type MovieState = Movie & { actors: Cast[]; directors: Crew[] };

export const useMovieFetch = (movieId: number) => {
  const [state, setState] = useState<MovieState>({} as MovieState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const movie = await API.fetchMovie(movieId);
        const credits = await API.fetchCredits(movieId);

        const directors = credits.crew.filter(
          (member) => member.job === "Director"
        );
        setState({
          ...movie,
          actors: credits.cast,
          directors: directors,
        });
        setLoading(false);
      } catch (e) {
        setError(true);
      }
    };
    const sessionState = isPersistantState(movieId.toString());
    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return;
    }

    fetchData();
  }, [movieId]);

  useEffect(() => {
    sessionStorage.setItem(movieId.toString(), JSON.stringify(state));
  }, [state, movieId]);

  return { state: state, loading: loading, error: error };
};

import React from "react";

import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
import NoImage from "../images/no_image.jpg";

import { useHomeFetch } from "../hooks/useHomeFetch";
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";

const Home: React.FC = () => {
  const { state, loading, error, setSearchTerm, searchTerm, setIsloadingMore } =
    useHomeFetch();
  if (error) return <div>Something Went Wrong!</div>;
  return (
    <>
      {!searchTerm && state.results[0] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
        {state.results.map((movie) => {
          return (
            <Thumb
              key={movie.id}
              clickable
              movieId={movie.id}
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + BACKDROP_SIZE + movie.poster_path
                  : NoImage
              }
            />
          );
        })}
      </Grid>
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button text="Load More" callback={() => setIsloadingMore(true)} />
      )}
    </>
  );
};

export default Home;

import React, { useContext } from "react";
import Thumb from "../Thumb";
import API from "../../API";
import { IMAGE_BASE_URL, BACKDROP_SIZE } from "../../config";
import NoImage from "../../images/no_image.jpg";

import { Wrapper, Content, Text } from "./MovieInfo.styles";

import { MovieState } from "../../hooks/useMovieFetch";
import Rate from "../Rate";
// Context
import { Context } from "../../Context";
type Props = {
  movie: MovieState;
};

const MovieInfo: React.FC<Props> = ({ movie }) => {
  const [user] = useContext<any>(Context);
  const handleRating = async (value: number) => {
    const rate = await API.rateMovie(user.sessionId, movie.id, value);
    console.log(rate);
  };
  return (
    <Wrapper backdrop={movie.backdrop_path}>
      <Content>
        <Thumb
          image={
            movie.backdrop_path
              ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.poster_path}`
              : NoImage
          }
          clickable={false}
        />
        <Text>
          <h1>{movie.title}</h1>
          <h3>PLOT</h3>
          <p>{movie.overview}</p>
          <div className="rating-directors">
            <div>
              <h3>RATING</h3>
              <div className="score">{movie.vote_average}</div>
            </div>
            <div className="director">
              <h3>DIRECTOR{movie.directors.length > 1 ? "S" : ""}</h3>
              {movie.directors.map((director) => (
                <p key={director.credit_id}>{director.name}</p>
              ))}
            </div>
          </div>
          {user && (
            <div>
              <p>Rate Movie</p>
              <Rate callback={handleRating} />
            </div>
          )}
        </Text>
      </Content>
    </Wrapper>
  );
};

export default MovieInfo;

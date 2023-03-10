import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "./axios";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setmovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setmovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="Row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path)) && (
              <img
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                className={`row__poster ${isLargeRow && "row_posterLarge"}`}
                key={movie.id}
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;

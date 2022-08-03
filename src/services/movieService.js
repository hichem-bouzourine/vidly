import http from "./httpService";
import config from "../config.json";

const apiEndPoint = `${config.apiUrl}/movies`;
export function getMovies() {
  return http.get(apiEndPoint);
}

export async function getMovie(movieId) {
  const { data: movies } = await http.get(apiEndPoint);
  return movies.find((m) => m._id === movieId);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndPoint + "/" + movieId);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(apiEndPoint + "/" + movie._id, body);
  }
  return http.post(apiEndPoint + "/", movie);
}

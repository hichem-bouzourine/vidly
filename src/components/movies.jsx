import React, { Component } from "react";
import Pagination from "./common/pagination";
import { deleteMovie, getMovies } from "../services/movieService";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();

    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("this movie has already been deleted");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = this.state.movies;
    const index = movies.indexOf(movie);
    // movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleModify = (movieId) => {
    this.props.navigate(`/movies/${movieId}`, { replace: false });
  };

  getPageData(
    selectedGenre,
    allMovies,
    sortColumn,
    currentPage,
    pageSize,
    searchQuery
  ) {
    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filtered =
        selectedGenre && selectedGenre._id
          ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
          : allMovies;
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { filtered, movies };
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const { lenght: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies,
      searchQuery,
    } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no movies in the database</p>;

    const { filtered, movies } = this.getPageData(
      selectedGenre,
      allMovies,
      sortColumn,
      currentPage,
      pageSize,
      searchQuery
    );

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            textProperty="name"
            valueProperty="_id"
            selectedGenre={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
          <SearchBox
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={this.handleSearch}
          />
          <p>There are {filtered.length} movies in the database</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            user={user}
            onModify={this.handleModify}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

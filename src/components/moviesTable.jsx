import React, { Component } from "react";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" },
  ];
  render() {
    const { movies, onModify, onDelete, onLike, onSort, sortColumn } =
      this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
        onLike={onLike}
        onModify={onModify}
        onDelete={onDelete}
      />
    );
  }
}

export default MoviesTable;

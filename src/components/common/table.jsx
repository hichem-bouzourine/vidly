import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
  const { columns, sortColumn, onSort, data, onLike, onDelete, onModify } =
    props;

  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody
        columns={columns}
        data={data}
        onLike={onLike}
        onModify={onModify}
        onDelete={onDelete}
      />
    </table>
  );
};

export default Table;

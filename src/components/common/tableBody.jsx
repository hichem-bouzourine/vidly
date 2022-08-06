import React, { Component } from "react";
import Like from "../common/like";
import _ from "lodash";
// import { getCurrentUser } from "../../services/httpService";

class TableBody extends Component {
  render() {
    const { data, columns, onLike, onDelete, onModify, user } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={item._id + (column.path || column.key)}>
                {_.get(item, column.path)}
              </td>
            ))}
            <td>
              <Like liked={item.liked} onClick={() => onLike(item)} />
            </td>
            <td>
              {user && (
                <button
                  onClick={() => onModify(item._id)}
                  className="btn btn-warning btn-sm"
                >
                  Modify
                </button>
              )}
            </td>
            <td>
              {user && user.isAdmin && (
                <button
                  onClick={() => onDelete(item)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;

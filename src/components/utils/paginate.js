import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const start = (pageNumber - 1) * pageSize;
  return _(items).slice(start).take(pageSize).value();
}

import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = `${apiUrl}/users`;

export function register(user) {
  return http.post(apiEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

// export function getUsers() {
//   return http.get(apiEndPoint);
// }

// export function getUser(userId) {
//   return http.get(apiEndPoint + "/" + userId);
// }

// export function saveUser(user) {
//   if (user._id) {
//     const data = { ...user };
//     delete data._id;
//     return http.put(apiEndPoint + "/" + user._id, data);
//   }
//   http.post(apiEndPoint, user);
// }

// export function deleteUser(userId) {
//   return http.delete(apiEndPoint + "/" + userId);
// }

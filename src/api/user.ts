import localforage from "localforage";
import { BASE_URL } from ".";
import UserType from "../types/UserType";
import { setUserToken } from "./index";

export const registerUser = async (user:UserType) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user})
      });
      const result = await response.json();
// You can log ▲▲▲ the result
// here ▼▼▼ to view the json object before returning it
      console.log(result)
      
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const loginUser = async (user:UserType) => {

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user})
      });
      const result = await response.json();
      setUserToken(user.username,result.data.token);
      return result
    } catch (err) {
      console.error(err);
    }
  }

 export const getUserData = async (token: string) => {

    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export function setLocalUser(user:string) {
    return localforage.setItem("users", user);
  }
/*

  export async function getUsers(query) {
    let users = await localforage.getItem("users");
    if (!users) users = [];
    if (query) {
      users = matchSorter(users, query, { keys: ["username"] });
    }
    return users.sort(sortBy("last", "createdAt"));
  }
  
  export async function createUser(_id) {
    const user = { _id, createdAt: Date.now() };
    const users = await getUsers();
    users.unshift(user);
    await set(users);
    return user;
  }
  
  export async function findUser(_id) {
    const users = await localforage.getItem("users");
    const user = users.find(user => user._id === _id);
    return user ?? null;
  }
  
  export async function updateUser(_id, updates) {
    const users = await localforage.getItem("users");
    const user = users.find(user => user._id === _id);
    if (!user) throw new Error("No contact found for", _id);
    Object.assign(user, updates);
    await set(users);
    return user;
  }
  
  export async function deleteUser(_id) {
    const users = await localforage.getItem("users");
    const index = users.findIndex(user => user._id === _id);
    if (index > -1) {
      users.splice(index, 1);
      await set(users);
      return true;
    }
    return false;
  }

  
  function set(user) {
    return localforage.setItem("users", user);
  }
  */
  
/*
import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getContacts(query) {
  await fakeNetwork(`getContacts:${query}`);
  let contacts = await localforage.getItem("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let contact = { id, createdAt: Date.now() };
  let contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function getContact(id) {
  await fakeNetwork(`contact:${id}`);
  let contacts = await localforage.getItem("contacts");
  let contact = contacts.find(contact => contact.id === id);
  return contact ?? null;
}

export async function updateContact(id, updates) {
  await fakeNetwork();
  let contacts = await localforage.getItem("contacts");
  let contact = contacts.find(contact => contact.id === id);
  if (!contact) throw new Error("No contact found for", id);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id) {
  let contacts = await localforage.getItem("contacts");
  let index = contacts.findIndex(contact => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
  import localforage from "localforage";
  import { matchSorter } from "match-sorter";
  import sortBy from "sort-by";
} */

import STResponse from "../types/STResponse";
import { BASE_URL } from ".";
import PostType from "../types/PostType";


export async function getPosts(){
  try{
    const req = await fetch(BASE_URL+'/posts');
    const res = await req.json() as STResponse;
    return res.data.posts;
  }catch(err){
    console.error(err);
  }
}

export async function createPost(token:string,post:PostType){
/*
{
  method:"POST",
  headers: 
  {
    Content-Type:application/json, 
    Authorization:`Bearer${token}`
  }

  body: JSON.stringify({
    post:{title, description, price, location, willDeliver}
  })
}
Return STResponse{}
*/    
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({post})
    });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
    console.error(err);
  }
}

export async function getPost(postId:string|number){
  try{
      const req = await fetch(BASE_URL+postId);
      const res = await req.json();
      console.log(res);
      return res;
  }catch(error){
      console.error(error);
  }
}


export async function updatePost(id:string|number, token:string, post:PostType){
/*
`${BASE_URL}/posts/${post._id}`,{
  method:"PATCH",
  headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN_STRING_HERE}`
  },
  body:JSON.stringify({
    post:{
      title: "My favorite stuffed animal",
      description: "This is a pooh doll from 1973. It has been carefully taken care of since I first got it.",
      price: "$480.00",
      location: "New York, NY",
      willDeliver: true
    }
  }),
}
*/
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({post})
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export async function deletePost(id: string|number,token:string){
/*
`${BASE_URL}/posts/${post._id}`,{
  method:"PATCH",
  headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN_STRING_HERE}`
  },
}
  */
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

//function set(){}
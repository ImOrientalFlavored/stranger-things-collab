import localforage from "localforage";
//import sortBy from "sort-by";
//import matchSort from "matchSorter";
import { sendUserTest } from "./test";

const COHORT_NAME = '2302-ACC-PT-WEB-PT-A'
export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

/*
Post Endpoints:
   - `${BASE_URL}/posts`
   - `${BASE_URL}/users/register`
   - `${BASE_URL}/posts/login`
   - `${BASE_URL}/posts/{ID}/messages`
GET Endpoints:
    - `${BASE_URL}/users/me`
    - `${BASE_URL}/posts`
    - `${BASE_URL}/test/me`
    - `${BASE_URL}/test/data`
Patch/Put Endpoints:
   - `${BASE_URL}/posts${ID}`
Delete Endpoints:
   - `${BASE_URL}/posts/${ID}`
Authentication:
Editting Posts:
Return Data:

*/

export default async function fetchPosts(){
    try{
        const req = await fetch(BASE_URL+'/posts');
        const res = req.json();
        return res;
    }catch(err){
        console.error(err);
    }
}


export function setUserToken(user:string, token:string){
    localforage.setItem(`${user}`, token)
}
export function setLocalToken(token:string){
    localforage.setItem('token', token);
}

export function setUsername(user:string){
    localforage.setItem('user', user)
}

export async function getLocalToken(){
    let token:string|null = await localforage.getItem('token')
    if (!token) token = '';
    return token;
}

export async function getLocalUser(){
    let token:string|null = await localforage.getItem('user')
    if (!token) token = '';
    return token;
}

export async function getUserToken(query:string) {
    let token:string|null = await localforage.getItem(query);
    console.log(token);

    if (!token) token = '';

    return token;
}


export async function checkAuthentication(user:string){
try{
    const req = await sendUserTest(await getUserToken(user))
    return(req.success);
}catch(e){
    console.error(e);
}
}
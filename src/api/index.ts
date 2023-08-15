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
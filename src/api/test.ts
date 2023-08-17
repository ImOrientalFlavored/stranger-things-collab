import { BASE_URL } from ".";

export async function sendUserTest(token:string){
    try{
        const req = await fetch(`${BASE_URL}/test/me`, {
            method:"GET",
            headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        });
        const res = await req.json();
        console.log("Test:");
        console.log(res);
        return res;
    }catch(error){
        console.error(error);
    }
}

export async function sendDataTest(token:string){
    try{
        const req = await fetch(`${BASE_URL}/test/data`, {
            method:"GET",
            headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        });
        const res = await req.json();
        console.log("Test:");
        console.log(res);
        return res;
    }catch(error){
        console.error(error);
    }
}
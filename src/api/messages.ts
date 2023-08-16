import { BASE_URL } from ".";

export const postMessage = async (id:string|number, token:string, content:string) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: {content}
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
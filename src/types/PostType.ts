
export default interface PostType{
    id: number|string,
    author:string,
    title:string,
    description:string,
    price:string|number,
    location?:string,
    distance?:string,
    createdAt:string,
}
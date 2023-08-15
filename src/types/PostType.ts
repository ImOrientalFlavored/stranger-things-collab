
export default interface PostType{
    id: number|string,
    author:{
        _id:string,
        username:string
    }
    title:string,
    description:string,
    price:string|number,
    location?:string,
    distance?:string,
    createdAt:string,
    willDeliver?:boolean,
    messages:[],
    isAuthor:boolean,
    active:boolean,
    cohort:string,
    _v:number,
    _id:string,
}
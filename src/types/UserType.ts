import PostType from "./PostType";

export default interface UserType{
    posts: PostType[];
    messages:[],
    _id:string,
    username:string,
}
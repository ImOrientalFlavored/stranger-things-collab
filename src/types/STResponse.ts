import PostType from "./PostType"

export default interface STResponse{
    success:boolean,
    error:object|null,
    data:{
        posts:PostType[]
    }
}
import { useSearchParams } from "react-router-dom";
import PostType from "../types/PostType";
import PostCard from "../components/layout/PostCard";
import Header from "../components/layout/Header";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function SearchPage(){
    const [search] = useSearchParams();
    console.log(search);
    let posts = []; 
    if(search.get('posts') !== null)
            posts= JSON.parse(search.get('posts')!);
    console.log(posts);
    
    return(
        <>
            {/* Header */}
            <Header title="Search Results" subtitle="no promises though..." />
            {/* Sub Header */}
            {/* Search List */}
            {/* Render Filtered List  */}
            <Grid2 display={'flex'} flexDirection={'column'} gap={'2em'}>

                {(posts !== null||undefined) && posts.length!==0 ?(
                        posts.map((post:PostType)=>{ return <PostCard post={post} />})
                    ):(
                        <h2>No search results</h2>
                    )
                }
            </Grid2>
        </>
    )
}

import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import fetchPosts from '../api'
import PostCard from '../components/layout/PostCard';
import { Box } from '@mui/material';
import PostType from '../types/PostType'

export default function Index(){

    const [ fetchedPosts, setFetchedPosts] = useState<PostType[]>([]);

    useEffect(()=>{
        async function requestPosts(){
            const posts = await fetchPosts();
            setFetchedPosts(posts.data.posts);
        }
        requestPosts();
    },[])

    console.log(fetchedPosts);

    return (
        <>
            <Typography variant='h2'>
                Index
            </Typography>
            <Box display="flex" flexWrap={"wrap"} gap={"1rem"}>
                {
                    fetchedPosts.map((post)=>{
                    return <PostCard key={post.id} post={post}/>
                    })
                }
            </Box>
        </>
    )
}
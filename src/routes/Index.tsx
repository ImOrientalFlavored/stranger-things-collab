import Typography from '@mui/material/Typography';
//import { useEffect, useState } from 'react';
import fetchPosts from '../api'
import PostCard from '../components/layout/PostCard';
import { Box, Divider } from '@mui/material';
import PostType from '../types/PostType'
import { useLoaderData } from 'react-router-dom';

export async function loader() {
    const fetchedPosts = await fetchPosts();
    const posts = fetchedPosts.data.posts;
    return { posts };
}

export default function Index(){

    const { posts } = useLoaderData() as {posts:PostType[]};

   
    console.log(posts);

    return (
        <Box>
            {/* Page Title */}
            <Box>
                <Typography variant='h1' justifySelf={"center"}>
                    Index
                </Typography>
                <Divider />
            </Box>
            {/* Category Group */}
            <Box>
            {/* Category Header*/}
                <Box>
                    <Typography variant='h1' justifySelf={"center"}>
                        Recent Posts
                    </Typography>
                </Box>
                {/* Category Post Carousel*/}
                <Box display="flex" flexWrap={"wrap"} gap={"1rem"}>
                    {
                        posts.map((post)=>{
                            return <PostCard key={post.id} post={post}/>
                        })
                    }
                </Box>
                <Divider/>
            </Box>


        </Box>
    )
}
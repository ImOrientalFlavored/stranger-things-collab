import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import fetchPosts from '../api'
import PostCard from '../components/layout/PostCard';
import { Box, Divider } from '@mui/material';
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
                        fetchedPosts.map((post)=>{
                            return <PostCard key={post.id} post={post}/>
                        })
                    }
                </Box>
                <Divider/>
            </Box>


        </Box>
    )
}
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import fetchPosts from '../api'
import PostCard from '../components/layout/PostCard';
import { Box, Divider } from '@mui/material';
import PostType from '../types/PostType'
import Header from '../components/layout/Header';

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
            <Box display={"flex"} justifyContent={"center"}>
                <Header title="Stranger's Things" subtitle="You're at a strange place, at a strange time, looking at strange things but we don't find it strange."/>
                <Divider variant='inset' />
            </Box>
            {/* Category Group */}
            <Box>
            {/* Category Header*/}
                <Box>
                    <Typography variant='h2' justifySelf={"center"} mb={"1rem"} fontWeight={"bold"}>
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
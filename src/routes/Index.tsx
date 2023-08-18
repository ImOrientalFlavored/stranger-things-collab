//import Typography from '@mui/material/Typography';
//import { useEffect, useState } from 'react';
import PostCard from '../components/layout/PostCard';
import { Box, Divider } from '@mui/material';
import PostType from '../types/PostType'
import { useLoaderData } from 'react-router-dom';
import { getPosts } from '../api/posts';
import Header from '../components/layout/Header';
import Carousel from '../components/layout/Carousel';
//import { useTheme } from '@emotion/react';
//import { tokens } from '../theme';
//import CustomTheme from '../types/CustomTheme';
// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    const posts = await getPosts();
    return { posts };
}

export default function Index(){

    const { posts } = useLoaderData() as {posts:PostType[]};

    return (
        <Box>
            {/* Page Title */}
            <Box 
                display={"flex"} 
                justifyContent={"center"}
                position={'relative'} 
                left={"-10%"}
            >
                <Header title="Stranger's Things" subtitle="You're at a strange place, at a strange time, looking at strange things but we don't find it strange."/>
                <Divider variant='inset' />
            </Box>
            {/* Category Group */}
            <Box>
            {/* Category Header*/}

                {/* Category Post Carousel*/}
                <Carousel title='Recent Things' subtitle='Get them while they still have that "fresh scent"'>
                    {
                        posts.map((post)=>{
                            return <PostCard key={post.id} post={post}/>
                        })
                    }
                </Carousel>
                <Carousel title='Sitting Things' subtitle='Depending on context either or both'>
                    {
                        posts.map((post)=>{
                            return <PostCard key={post.id} post={post}/>
                        })
                    }
                </Carousel>
                <Carousel title='Strangest Things' subtitle="Yeah... we don't even know..">
                    {
                        posts.map((post)=>{
                            return <PostCard key={post.id} post={post}/>
                        })
                    }
                </Carousel>
                <Carousel title='Naughty Things' subtitle="We're all a bit of deviant, arent we? It wouldn't be the strangest thing... those are up there ☝️">
                    {
                        posts.map((post)=>{
                            return <PostCard key={post.id} post={post}/>
                        })
                    }
                </Carousel>
             
                <Divider/>
            </Box>
        </Box>
    )
}
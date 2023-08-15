import Typography from '@mui/material/Typography'
import {Box} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { BASE_URL } from '../api';
import PostType from '../types/PostType';

export default function Post(){
    const { postId } = useParams();
    const [fetchedPost, setFetchedPost] = useState({} as PostType)
    console.log(postId);
    useEffect(()=>{
        async function fetchPost(){
            try{
                const req = await fetch(BASE_URL+postId);
                const res = await req.json();
                console.log(res);
                setFetchedPost(res);
            }catch(error){
                console.error(error);
            }
        }
        fetchPost();
    },[])

    console.log(fetchedPost);

    return (
    <Box>
        <Typography variant='h2'>
            Post {`#${postId}`}
        </Typography>
    </Box>
    )
}
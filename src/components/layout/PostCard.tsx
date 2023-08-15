import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions, Icon, IconButton } from '@mui/material';
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import PostType from "../../types/PostType";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useTheme } from '@emotion/react';

import { useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';

interface PostCardProp{
    post : PostType
}

interface CustomTheme {
    palette:{
        mode:string
    }
}

export default function PostCard({post}: PostCardProp){
    const theme = useTheme() as CustomTheme;
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    console.log('PostCard ID:')
    console.log(post.id);
    
    return(
    <Card sx={{ 
        width: 450,
        height: 320,
        display: 'flex',
    }}>
        <Box position={'relative'} width={'100%'} overflow={"clip"}>
            <CardActionArea onClick={()=> navigate(`/posts/${post._id}`)}>
                <CardMedia
                component="img"
                height="120"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" fontSize={"18px"} component="div" color={colors.greenAccent[500]}>
                        {post.title}
                    </Typography>
                    <Typography variant="body1" textOverflow={"ellipsis"} fontSize="1rem" component="div" color="text.secondary" height={'400px'}>
                        {post.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Box 
                display={'flex'} 
                flexDirection={"row"} 
                justifyContent={"space-between"}
                alignContent={"end"}
                color={"white"} width={'100%'} 
                position={'absolute'} 
                bottom={'0'}
                right={'0'}
                borderTop={'2px solid grey'}
                >
                <IconButton size='large'>
                        <Icon>
                            <ShareIcon  />
                        </Icon>
                    </IconButton>
                    <IconButton size='large'>
                        <Icon>
                            <FavoriteBorderIcon  />
                        </Icon>
                    </IconButton>
                </Box>
            </CardActions>
          </Box>
    </Card>
  );
}
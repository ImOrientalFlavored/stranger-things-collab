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
import CustomTheme from '../../types/CustomTheme';

interface PostCardProp{
    post : PostType
}

export default function PostCard({post}: PostCardProp){
    const theme = useTheme() as CustomTheme;
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    console.log('PostCard ID:')
    console.log(post.id);
    
    return(
    <Card sx={{ 
        width: 320,
        height: 250,
        display: 'flex',
        flexShrink: 0,
        textOverflow:'clip',
    }}>
        <Box position={'relative'} width={'100%'} >
            <CardActionArea onClick={()=> navigate(`/posts/${post._id}`)}>
                <CardMedia
                component="img"
                sx={{border: '1px solid grey'}}
                height="80"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="  Some Image"
                />
                <CardContent sx={{overflow:'clip'}}>
                        <Typography gutterBottom variant="h5" fontSize={"18px"} component="div" color={colors.greenAccent[500]}>
                            {post.title}
                        </Typography>
                    <Box textOverflow={'ellipsis'} overflow={'hidden'} height={'200px'}>
                        <Typography 
                           
                            component="div" 
                            color="text.secondary" 
                            height={'200px'}
                            sx={{
                                display:'inline-block',
                                wordBreak:'break-word'
                            }}
                        >
                            {post.description}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Box 
                display={'flex'} 
                flexDirection={"row"} 
                justifyContent={"space-between"}
                alignContent={"end"}
                color={"white"} 
                width={'100%'} 
                position={'absolute'} 
                bottom={'0'}
                right={'0'}
                zIndex={20}
                borderTop={'1px solid grey'}
                sx={{
                    backgroundColor:`${colors.grey[700]}`,
                    boxShadow: '20px 0 5px 10px #0000002c '
                    
                }}
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
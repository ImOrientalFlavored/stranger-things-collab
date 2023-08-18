/*
Carousel logic

Effective width 
Ew = Width of page - (cumulative margin+padding)

Number of cards to display/select 
sCards= Ew/Cardwidth 


Selected cards are focused
.active toggle
Unselected cards are blurred

Cards=document.getElementsByClass("player-card")

Cards is array of nodes may need node list

Cards display on a single row
Display flex 
flex no wrap

When carousel direction clicked the starting and ending index should shift by one

Initial index
 x1, x2 = 0 , sCards.length - 1

Btn-lt   (x1,x2)--
Btn-rt   (x1,x2)++

 a = active el. ; b = blurred element ; h = hidden
        |aaaaa|bhhhh
       b|aaaaa|bhhh    //btn-rt clicked
      hb|aaaaa|bhh     //btn-rt clicked
       b|aaaaa|bhhh    //btn-lt clicked
        |aaaaa|bhhhh //btn-lt clicked

hidden indexes
Start = z1
 z1 = x1 - 2
If x1 - 2 < 0 then no-op

End = z2
 z2 = sCards.length+1
	If z2 - sCards.length <= 1 then no-op
    hhb|aaaaa|b   b is last el

If index >= x1 && index <= x2 then active
If index <=z1 && index >= z2 then hidden
Else blurred


//Problem one - method to move 
//elements on the screen?
//Absolute, relative, other property?

//Second problem updating the display with
//elements in new position?
//Clear container, repopulate with //constraints?
yes clearing container and repopulating with a sliced array works
*/

import { Box, Button, Divider, Typography, useTheme } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React, { useState } from "react";
import { tokens } from "../../theme";
import CustomTheme from "../../types/CustomTheme";

interface CarouselProps{
    title:string,
    subtitle?:string,
    children?: React.ReactNode;
}

const carouselWidth = 1500;
const cardWidth = 320;
const buttonHeight = 260;
const gapWidth = 20;    
const numCards = (Math.floor(carouselWidth/cardWidth))-1;


export default function Carousel({title, subtitle='' ,children}:CarouselProps){
    const theme = useTheme() as CustomTheme;
    const colors = tokens(theme.palette.mode);
    console.log(numCards);
    
    const cc = children as React.ReactNode[];
    const [xPositionOne, setXPositionOne] = useState(0)
    const [xPositionTwo, setXPositionTwo] = useState(numCards)

    //Morbid but okay
    const [slicedChildren, setSlicedChildren] = useState<React.ReactNode[]>(
            cc.slice(xPositionOne,xPositionTwo)
        )
    
    const handleLClick = () => {
        if(xPositionOne>0){        
            setSlicedChildren(cc.slice(xPositionOne-1,xPositionTwo-1));
            setXPositionOne(xPositionOne-1);
            setXPositionTwo(xPositionTwo-1);
        }
    }
    const handleRClick = () => {
        if(xPositionTwo<cc.length){
            setSlicedChildren(cc.slice(xPositionOne+1,xPositionTwo+1))
            setXPositionOne(xPositionOne+1);
            setXPositionTwo(xPositionTwo+1);
        }
    }
   
    return(
        <Box>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} >
                <Typography variant='h2' mb={"1rem"} fontWeight={"bold"}>
                        {title}
                </Typography>
                <Divider  sx={{ height: 28, m: '0 0.5em 1em 0.5em' }} orientation="vertical"/>
                <Typography mb={"1rem"} color={colors.greenAccent[700]} fontStyle={'italic'}>
                    {subtitle}
                </Typography>
            </Box>
            <Box boxShadow={`inset 0 0 100px 30px ${colors.blueAccent[900]}`}>
                <Box id='carousel-btn-lt' display={'flex'} flexWrap={'nowrap'} flexDirection={'row'} justifyContent={'space-between'} border={'1px solid black'}>
                    {/**Carousel Button Left */}
                    <Box display={'flex'} alignItems={'stretch'} height={`${buttonHeight}px`}>
                        <Button 
                        onClick={()=>handleLClick()}
                        sx={{
                            borderRadius:'0',
                            boxShadow:'0 0 8px 3px #6f6f6f61',
                            backgroundColor:`${colors.grey[600]}80`,
                            "&:hover":{
                                backgroundColor:`${colors.primary[300]}80`},
                            }}>
                            <ChevronLeftIcon sx={{
                                fontSize:'60px',
                                color:`${colors.greenAccent[500]}`,
                            }}/>
                        </Button>
                    </Box>
                    {/**Carousel Card Container */}
                    <Box 
                    id='carousel-container' 
                    display={'flex'} 
                    flexWrap={'nowrap'}
            
                    padding={'.5em 2em .5em 2em'}
                
                    flexDirection={'row'} 
                    justifyContent={'space-around'} 
                    gap={`${gapWidth}px`} 
                    overflow={'hidden'}
                    maxWidth={`${carouselWidth}px`}
                    >
                        {slicedChildren}
                    </Box>
                    {/**Carousel Button Right */}
                    <Box display={'flex'} alignItems={'stretch'} height={`${buttonHeight}px`}>
                        <Button 
                        onClick={()=>handleRClick()}
                        sx={{
                            borderRadius:'0',
                            boxShadow:'0 0 8px 3px #6f6f6f61',
                            backgroundColor:`${colors.grey[600]}80`,
                            "&:hover":{
                                backgroundColor:`${colors.primary[300]}80`},
                            }}>
                            <ChevronRightIcon sx={{
                                fontSize:'60px',
                                color:`${colors.greenAccent[500]}`,
                            }}/>
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Divider variant="inset" sx={{m:'2em 0 5em 0'}}  />
        </Box>
    )
}
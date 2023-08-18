import { Box } from "@mui/material";

type ContentPaneProp ={
    children?:React.ReactNode
  }

export default function ContentPane({children}:ContentPaneProp){
    return <Box width={'92vw'} height={'100%'} minHeight={'81vh'}>
        {children}
    </Box>
}
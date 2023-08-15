import { Box } from "@mui/material";

type ContentPaneProp ={
    children?:React.ReactNode
  }

export default function ContentPane({children}:ContentPaneProp){
    return <Box padding={'1rem'} width={'100%'} height={'100%'} minHeight={'81vh'}>
        {children}
    </Box>
}
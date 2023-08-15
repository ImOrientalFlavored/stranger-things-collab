import { FormControl, TextField } from "@mui/material"
import { Form } from "react-router-dom"

export default function PostForm(){
    return <>
    <FormControl>
        <Form>
            <TextField 
                focused
                required
                label="Title"/>
            <TextField 
                focused
                required 
                label="Author"/>
            <TextField 
                focused
                required
                label="Desciption"/>
            <TextField 
                focused
                required 
                label="Price"/>
        </Form>
    </FormControl>
    </>
}
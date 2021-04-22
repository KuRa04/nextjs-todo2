import React,{useState} from 'react'
import {ListItem,TextField,Grid} from "@material-ui/core"
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined"
import EditOutlinedIcon from "@material-ui/icons/EditOutlined"
import { db } from "../utils/firebase"
import Link from 'next/link'


interface PROPS{
    id:string;
    title:string;
}

const TaskItem: React.FC<PROPS> = (props) =>{
    const [title,setTitle] = useState(props.title);


    const editTask = () => {
        db.collection("tasks").doc(props.id).set({title:title},{merge:true});
    }

    const deleteTask = () => {
        db.collection("tasks").doc(props.id).delete();
    }


return (

    <ListItem>
        <Link href="../tasks/detail"><a>
        {props.title}
         </a></Link>
        <Grid container justify="flex-end">
        <TextField
        label="Edit task"
        value={title}
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)}
/>

        </Grid>
    <button onClick={editTask}>
        <EditOutlinedIcon />
    </button>

    <button onClick={deleteTask}>
        <DeleteOutlineOutlinedIcon />
    </button>
    </ListItem>

)

}

export default TaskItem
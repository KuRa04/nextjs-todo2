import React, { useEffect, useState } from 'react'
import { FormControl,List,TextField } from '@material-ui/core';
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { useRouter } from 'next/router'
import Head from 'next/head'

import { auth } from '../utils/firebase'
import { db } from "../utils/firebase";
import TaskItem from "../components/TaskItem";
import classes from '*.module.css';

import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
  field:{
    marginTop:30,
    marginBottom:20,
  },
  list:{
    margin:"auto",
    width:"40%",
  },
});



const Home: React.FC = (prop:any) => {

const [tasks,setTasks] = useState([{id:"",title:""}]);   //titleをfirestoreのデータベースから取ってくr
const [input,setInput] = useState("");
const classes = useStyles();


//snapshotでデータベースのtasksの値を取ってくる
useEffect(() => {
  const unSub = db.collection("tasks").onSnapshot((snapshot) =>{
    setTasks(
      snapshot.docs.map((doc) => ({id:doc.id,title:doc.data().title}))
    );
  });

  return () => unSub();
},[]);

const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
  db.collection("tasks").add({title:input});
  setInput("");
}


  return ( 
  <div className="App_root">
    <h1 className="title">Firebase/Next.js TodoList</h1>
    <FormControl>
      <TextField
      className={classes.field}
      label="new task"
      value={input}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
        setInput(e.target.value)
      }}
      />
  </FormControl>
     <button className="App__icon" disabled={!input} onClick={newTask}>
      <AddToPhotosIcon />
    </button>

      <List className={classes.list}>
      {tasks.map((task)=>(
        <TaskItem key={task.id} id={task.id} title={task.title} />
      ))}
     
      </List>
      
    </div>


  );
};

export default Home;

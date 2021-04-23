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
import { route } from 'next/dist/next-server/server/router';
import firebase from "firebase/app";


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

const Home: React.FC = (props:any) => {

const [tasks,setTasks] = useState([{id:"",title:"",tagIds:[]}]);   //titleをfirestoreのデータベースから取ってくr
const [input,setInput] = useState("");
const [tagInput,setTaginput] =  useState("");
const classes = useStyles();


const router = useRouter()
const [currentUser,setCurrentUser] = useState<null | object>(null)  //この型の設定何だ　<null | object>

//ユーザープロフィール取得

var user = firebase.auth().currentUser;
if (user != null) {
  var uid = user.uid;
}


//snapshotでデータベースのtasksの値を取ってくる
useEffect(() => {
  const unSub = db.collection("users").doc(uid).collection("tasks").onSnapshot((snapshot) =>{
    setTasks(
      snapshot.docs.map((doc) => ({id:doc.id,title:doc.data().title,tagIds:doc.data().tagIds}))
    );
  });

  return () => unSub();
},[]);


//user情報の確認
useEffect(() => {
  auth.onAuthStateChanged((user) => {
    user ? setCurrentUser(user) : router.push('./login')
  })
},[])

//logoutから
const logOut = async () =>{
  try{
    await auth.signOut()
    router.push('./login')
  }catch(error){
    alert(error.message)
  }
}

//inputする場所を作る

// const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
//   db.collection("tasks").add({title:input});
//   setInput("");
// }


const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
  db.collection("users").doc(uid).collection("tasks").add({title:input,tagIds:tagInput});
  setInput("");
  setTaginput("");
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
      
    <TextField
      className={classes.field}
      label="new tag"
      value={tagInput}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
        setTaginput(e.target.value)
      }}
/>
  </FormControl>
     <button className="App__icon" disabled={!input} onClick={newTask}>
      <AddToPhotosIcon />
    </button>

      <List className={classes.list}>
      {tasks.map((task)=>(
        <TaskItem key={task.id} id={task.id} title={task.title} tagIds={task.tagIds}/>
      ))}
     


      </List>
      <button onClick={logOut}>Logout</button>
    </div>


  );
};

export default Home;

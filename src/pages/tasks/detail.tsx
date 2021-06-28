import React, { useEffect, useState } from 'react'
import { FormControl,List,TextField } from '@material-ui/core';
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { auth } from '../../utils/firebase'
import { db } from "../../utils/firebase";
import TaskItem from "../../components/TaskItem";

const Detail: React.FC = (props:any) => {
    const [contents,setContent] = useState([{content:""}]);

    useEffect(() => {
      const unSub = db.collection("tasks").onSnapshot((snapshot) => {
        setContent (
          snapshot.docs.map((doc) => ({content:doc.data().content}))
            );
          });
        return () => unSub();
    },[]);

    return (
      <div>
        {contents.map((task)=><h3>{task.content}</h3>)}
        <br />
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>
    )
  };

export default Detail;

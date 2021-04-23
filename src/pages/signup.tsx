import {FC,useEffect,useState} from 'react'
import Router , {useRouter } from 'next/router'
import Link from 'next/link'
import { db } from "../utils/firebase";


import { auth} from '../utils/firebase'
import {AuthContext} from '../auth/AuthProvider'

import firebase from "firebase/app";



const SignUp: FC = () => {
    const router = useRouter()
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            user && router.push('/')
        })
    },[])

const createUser = async(e) => {
    e.preventDefault()
    try{
        await auth.createUserWithEmailAndPassword(email,password)
        //firebase.auth.currentUser
        var user = firebase.auth().currentUser;
          if (user != null) {  //ここでuserID作成
             var uid = user.uid;
                }
        db.collection("users").doc(uid).set({userId:email}); //ユーザーアカウントを作成したらfirestoreにデータ登録
        const tags = ["国語","算数","社会"];   //配列の宣言方法と型推論によって型を定義していなくとも認識してくれる
        tags.forEach(tags => db.collection("users").doc(uid).collection("tags").add({tagName:tags}));   //foreachで書き直したもの 
        setEmail('')
        router.push('./login')
    }catch(err){
        alert(err.message)
    }
}


return (
    <div className="wapper">
        <form className="auth" onSubmit={createUser}>
            <div>
                <label htmlFor="email" className="auth-label">
                    Email{' '}
                </label>
                <input 
                 id="email"
                 className="auth-input"
                 type="email"
                 onChange={(e) => setEmail(e.target.value)}
                 />
            </div>
            <div className="mt-2">
                <label htmlFor="password" className="auth-label">
                    Password{' '}
                </label>
                <input 
                id="password"
                className="auth-input"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="auth-btn" type="submit">
                Signup
            </button>
        </form>
        <Link href="/login">
            <a className="auth-link">Login</a>
        </Link>
    </div>
)
}


export default SignUp
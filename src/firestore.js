import {getFirestore,doc,getDoc,getDocs,setDoc,updateDoc} from 'firebase/firestore';

let db = getFirestore();


export async function addData({firstname=null,lastname=null,email,username=null,age=null}){
    setDoc(doc(db,"Users",email),{firstname,lastname,email,username,age})
        .then(data => "done")
        .catch(err => console.error(err))
}

export async function getData(email){
    let data = await getDoc(doc(db,"Users",email));
    return data.data();
}

export async function updateData(email,username){
    updateDoc(doc(db,"Users",email),{
        username
    }) 
    .then(()=>{
        return new Promise((res,rej)=>{
            res("Username Updated");
        })
    })
}
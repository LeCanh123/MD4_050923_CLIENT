import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";




/* authen */
import { getAuth, signInWithPopup, GoogleAuthProvider  } from "firebase/auth";

const provider = new GoogleAuthProvider();
// thay config thành config của bạn
const firebaseConfig = {
  apiKey: "AIzaSyB1uLTbSCBMyI-amXp2oqsMMd_cl_BqIiA",
  authDomain: "uphinh-7980b.firebaseapp.com",
  projectId: "uphinh-7980b",
  storageBucket: "uphinh-7980b.appspot.com",
  messagingSenderId: "304935927335",
  appId: "1:304935927335:web:dbf026e4b046e560159802",
  measurementId: "G-S50ZSN7Y3F"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFileToStorage(file: File, folderName: string) { 

  if (!file) { 
    return false
  }
  const fileRef = ref(storage, `${folderName}/` + file.name);

  let url = await uploadBytes(fileRef, file).then( async res => {
    return await getDownloadURL(res.ref)
    .then(url => url)
    .catch(er => false)
  })

  return url
}

export async function Googlelogin() {
  const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    
    
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log("result",result);
    console.log("token",token);
    console.log("user",user);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  
}


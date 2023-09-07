import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";




/* authen */
import { getAuth, signInWithPopup, GoogleAuthProvider  } from "firebase/auth";

const provider = new GoogleAuthProvider();
// thay config thành config của bạn
const firebaseConfig = {
  apiKey: "AIzaSyCQ2tUzzWwJcdpw-0wxZf8Z1xOxXT7Ps5w",
  authDomain: "uphinh060923.firebaseapp.com",
  projectId: "uphinh060923",
  storageBucket: "uphinh060923.appspot.com",
  messagingSenderId: "1014427699399",
  appId: "1:1014427699399:web:b6cbcb5df6f9523d66d6e2",
  measurementId: "G-ETTNKE19H2"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFileToStorage(fileUploads:any, folderName:any, bufferData:any) { 
  // nếu file là null thì không làm gì hết
  if (!fileUploads) { 
    return false
  }

  let fileRef;
  let metadata;
  if (!bufferData) {
    // tên file trên file base
    fileRef = ref(storage, `${folderName}/` + fileUploads.name);
  }else {
    // tên file trên file base
    fileRef = ref(storage, `${folderName}/` + fileUploads.filename);
    metadata = {
      contentType: fileUploads.mimetype,
    };
  }
  let url;
  if (bufferData) {
      // upload file lên fire storage
    url = await uploadBytes(fileRef, bufferData, metadata).then( async res => {
      // khi up thành công thì tìm URL
      return await getDownloadURL(res.ref)
      .then(url => url)
      .catch(er => false)
    })
  }else {
      // upload file lên fire storage
    url = await uploadBytes(fileRef, fileUploads).then( async res => {
      // khi up thành công thì tìm URL
      return await getDownloadURL(res.ref)
      .then(url => url)
      .catch(er => false)
    })
  }


  return url
}




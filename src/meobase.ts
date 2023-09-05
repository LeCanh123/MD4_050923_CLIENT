import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1uLTbSCBMyI-amXp2oqsMMd_cl_BqIiA",
  authDomain: "uphinh-7980b.firebaseapp.com",
  projectId: "uphinh-7980b",
  storageBucket: "uphinh-7980b.appspot.com",
  messagingSenderId: "304935927335",
  appId: "1:304935927335:web:dbf026e4b046e560159802",
  measurementId: "G-S50ZSN7Y3F"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// tạo ra storage
export const storage = getStorage(app);


/* 
  1st params: your file, 2nd params: folder you need 
  return 
    if failed => false
    if success => url file
*/
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

/* 
  only params: folder name
  return 
    if failed => false
    if success => array url link
*/
export async function getFileInFolder(folderName:any) {
  const listRef = ref(storage, folderName);

  return await listAll(listRef).then( async (res) => {
    let result = []; // tạo array trống

    for (let i in res.items) { 
      let url = await getDownloadURL(res.items[i])
      .then(url => url)
      .catch(er => false)
      if (!url) {
        return false
      }
      result.push(url)
    }

    return result
  })
} 
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const fileupload = require("express-fileupload");
const { ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } = require('firebase/storage')
const { storage, db } = require('./firebase.js')
const { addDoc, collection } = require('firebase/firestore');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileupload());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 上傳
// app.post("/uploadImg", (req, res) => {
//   const file = req.files.yourUpload.data;
//   const name = req.files.yourUpload.name;
//   const storageRef = ref(storage, 'test/' + name);
//   uploadBytes(storageRef, file).then((snapshot) => {
//     console.log(snapshot);
//     console.log('Uploaded a blob or file!');
//     res.send({ msg: '已傳送資料', data: snapshot });
//   });
// });

// 上傳 + 回傳網址
app.post("/uploadImg", (req, res) => {
  const file = req.files.yourUpload.data;
  const name = req.files.yourUpload.name;
  const storageRef = ref(storage, 'test/' + name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        res.send({ msg: '上傳成功', url: downloadURL })
      });
    }
  );

});

// 寫入資料庫
app.post('/addData', async (req, res) => {
  const {nickName, age, pic} = req.body;
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      nickName,
      age,
      pic
    })

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", e);
  }
  
  res.send({ msg: '新增成功' })
})


// 刪除
app.delete('/deleteUploadImg/:fileName', (req, res) => {
  const fileName = req.params.fileName
  // Create a reference to the file to delete
  const desertRef = ref(storage, `test/${fileName}`);
  // Delete the file
  deleteObject(desertRef).then(() => {
    // File deleted successfully
    res.send({ msg: '已取消動作，並刪除已上傳圖片' })
  }).catch((error) => {
    // Uh-oh, an error occurred!
    res.send({ msg: '好像有些問題' })
  });
})

app.listen(port, () => {
  console.log(`伺服器正在聆聽 ${port} port...`)
})
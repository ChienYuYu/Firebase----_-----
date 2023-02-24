<script setup>
// 參考https://openhome.cc/Gossip/ECMAScript/FormData.html
import { ref } from 'vue';
import axios from 'axios';

const fileName = ref('');
const userData = ref({})

async function uploadFile(e) {
  if(e.target.files[0].type !== 'image/jpeg') {
    console.log('這不是圖片');
    return
  };
  const myUpload = e.target.files[0];
  fileName.value = e.target.files[0].name;
  const formData = new FormData();
  formData.append('yourUpload', myUpload)
  const res = await axios.post('http://localhost:3000/uploadImg', formData);
  userData.value.pic = res.data.url;
  console.log(res);
}

async function sendData() {
  const res = await axios.post('http://localhost:3000/addData', userData.value)
  console.log(res);
}

async function cancel() {
  if (fileName.value !== '') {
    const res = await axios.delete(`http://localhost:3000/deleteUploadImg/${fileName.value}`)
    console.log(res);
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="box">
      <h1>上傳測試</h1>
      <img :src="userData.pic" alt="">
      <div class="wrap input-upload-button">
        <input type="file" @change="uploadFile">
        <!-- <button>上傳圖片</button> -->
      </div>
      <label for="nickname">暱稱</label>
      <input type="text" id="nickname" v-model="userData.nickName">
      <label for="age">年齡</label>
      <input type="number" id="age" v-model="userData.age">
      <div class="btn-wrap">
        <button @click="sendData">上傳資料</button>
        <button @click="cancel">取消</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #bbb;
    padding: 1rem;
    border-radius: 1rem;

    h1,
    img {
      padding: 3rem;
    }

    img {
      width: 250px;
    }

    div.input-upload-button {
      display: flex;
      padding-bottom: 3rem;
    }

    div.btn-wrap {
      padding: 3rem;
      display: flex;

      button {
        margin: 0 1rem;
      }
    }

  }
}
</style>

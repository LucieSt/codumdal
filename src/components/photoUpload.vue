<template>
  <div class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
    <span v-if="!imageData" class="placeholder">
      Přidat foto
    </span>
    <input type="file" class="file-input" ref="fileInput" @input="onFileSelected">
  </div>
</template>

<script>

import axios from 'axios'

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dezbwzlqo/upload'
const CLOUDINARY_UPLOAD_PRESET = 'ovreowbd'

export default {
  data () {
    return {
      imageData: null
    }
  },
  methods: {
    onFileSelected (event) {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

      axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
      }).then(res => {
        // const div = document.querySelector('.photo-upload')
        // const container = document.createElement('div')
        // container.classList.add('container-img-upload')
        // const img = document.createElement('img')
        // img.setAttribute('src', res.data.secure_url)
        // img.classList.add('uploaded-img')
        // const close = document.createElement('div')
        // close.classList.add('closes-img')
        // container.appendChild(img)
        // container.appendChild(close)
        // div.appendChild(container)
        // this.imgUrlList.push(res.data.secure_url)
        this.imageData = res.data.secure_url
        console.log(res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    chooseImage () {
      this.$refs.fileInput.click()
    }
  }
}
</script>

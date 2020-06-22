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

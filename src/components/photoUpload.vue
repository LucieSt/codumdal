<template>
  <div class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
    <span v-if="!imageData" class="placeholder">
      Přidat foto
    </span>
    <input type="file" class="file-input" ref="fileInput" @input="onFileSelected">
  </div>
</template>

<script>

export default {
  data () {
    return {
      imageData: null
    }
  },
  methods: {
    onFileSelected (event) {
      const file = event.target.files[0]
      console.log(file)
      // const formData = new FormData()
      // formData.append('file', file)
      // formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

      if (file) {
        this.$emit('input', file)
      }

      // axios({
      //   url: CLOUDINARY_URL,
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   },
      //   data: formData
      // }).then(res => {
      //   this.imageData = res.data.secure_url
      //   console.log(res)
      // }).catch(function (err) {
      //   console.log(err)
      // })
    },
    chooseImage () {
      this.$refs.fileInput.click()
    }
  }
}
</script>

<template>
  <div class="login-component">

    <transition name="fade">
      <div v-if="performingRequest" class="loading">
        <p>Loading...</p>
      </div>
    </transition>

    <b-form v-if="showLoginForm" @submit.prevent>

      <h1 class="headline-logo">codůmdal</h1>

      <b-form-group
        id="email1"
        label="Email:"
        label-for="email1"
        description=""
      >
        <b-form-input
          id="email1"
          v-model.trim="loginForm.email"
          type="text"
          placeholder=""
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="password1"
        label="Heslo:"
        label-for="password1"
        description=""
      >
        <b-form-input
          id="password1"
          v-model.trim="loginForm.password"
          type="password"
          placeholder="******"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" @click="login">Přihlásit se</b-button>

      <div class="extras">
        <a>Zapomenuté heslo</a>
        <span>|</span>
        <a @click="toggleForm">Vytvořit účet</a>
      </div>

    </b-form>

    <b-form v-if="!showLoginForm" @submit.prevent>

      <h1 class="signup-headline">Nový účet</h1>

      <b-form-group
        id="name"
        label="Jméno:"
        label-for="name"
        description=""
      >
        <b-form-input
          id="name"
          v-model.trim="signupForm.name"
          type="text"
          placeholder=""
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="surname"
        label="Příjmení:"
        label-for="surname"
        description=""
      >
        <b-form-input
          id="surname"
          v-model.trim="signupForm.surname"
          type="text"
          placeholder=""
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="email2"
        label="Email:"
        label-for="email2"
        description=""
      >
        <b-form-input
          id="email2"
          v-model.trim="signupForm.email"
          type="text"
          placeholder=""
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="password2"
        label="Heslo:"
        label-for="password2"
        description=""
      >
        <b-form-input
          id="password2"
          v-model.trim="signupForm.password"
          type="password"
          placeholder="min 6 znaků"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="info" @click="signup">Vytvořit účet</b-button>

      <div class="extras">
          <a @click="toggleForm">Přihlásit se</a>
      </div>

    </b-form>

  </div>
</template>

<script>

const fb = require('../firebaseConfig.js')

export default {
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        surname: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      performingRequest: false
    }
  },
  methods: {
    toggleForm () {
      this.showLoginForm = !this.showLoginForm
    },
    login () {
      this.performingRequest = true
      fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(cred => {
        // cred (credentials) = object with a user (cred.user should work)
        // on resolve
        this.$store.commit('setCurrentUser', cred.user)
        this.$store.dispatch('fetchUserProfile')
        this.performingRequest = false
        this.$router.push('/')
      }).catch(err => {
        // on reject
        this.performingRequest = false
        console.log(err)
      })
    },
    signup () {
      this.performingRequest = true
      fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(cred => {
        this.$store.commit('setCurrentUser', cred.user)
        // create user obj
        fb.usersCollection.doc(cred.user.uid).set({
          name: this.signupForm.name,
          surname: this.signupForm.surname
        }).then(() => {
          this.$store.dispatch('fetchUserProfile')
          this.performingRequest = false
          this.$router.push('/')
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        this.performingRequest = true
        console.log(err)
      })
    }
  }
}

</script>

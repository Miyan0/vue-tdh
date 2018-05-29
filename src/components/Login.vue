<template>
  <form class="form">
    <p>
      <input 
        type="text"
        id="id-user" 
        class="form__input" 
        placeholder="nom utilisateur"
        v-model="username"
        required 
      >
      <label for="id-user" class="form__label">User</label>
    </p>
    <p>
      <input 
        type="password" 
        id="id-password"
        class="form__input" 
        placeholder="mot de passe"
        v-model="password"
        required 
      >
      <label for="id-password" class="form__label">Password</label>
    </p>

    <button @click="onSubmit" class="btn">OK</button>

  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    onSubmit(event) {
      event.preventDefault()
      this.login({
        username: this.username,
        password: this.password
      })
    }

  }
}
</script>

<style>

</style>

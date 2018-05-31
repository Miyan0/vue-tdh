<template>
  <div class="content">
    <div class="back-link">
      <router-link to="/" class="btn btn-accent">Back to Dashboard</router-link>
    </div>
    <div class="panel">
      <div class="login-header">
        <div class="header-icon">
          <i class="icon pe-7s-unlock"></i>
        </div>
        <div class="header-title">
          <h1 class="title txt-white">Login</h1>
          <p class="txt-sm subtitle">Please enter your credentials to login</p>
        </div>
        
      </div>
      <form class="form ">
        <div class="username">
          <label for="id-user" class="label">User</label>
          <input 
            type="text"
            id="id-user" 
            class="form-control" 
            placeholder="nom utilisateur" 
            v-model="username"
            required 
          >
          <p class="txt-sm">Your unique username</p>
        </div>
        <div class="password ">
          <label for="id-password" class="label">Password</label>
          <input 
            type="password" 
            id="id-password"
            class="form-control" 
            placeholder="mot de passe"  
            v-model="password"
            required 
          >
          <p class="txt-sm">Your strong password</p>
        </div>

        <button @click="onSubmit" class="btn btn-accent">Login</button>
      </form>
    </div>
    
  </div>
  
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

<style scoped lang="scss">
  @import "../sass/abstracts/_variables";

  
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .panel {
    width: 40%;
    padding: 1.5rem;
  }

  .back-link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-self: flex-start;
    margin: 2rem;
  }

  .username, .password {
    margin-bottom: 2rem;
    .label {
      margin-bottom: 3rem;
      color: $color-white;
    }
  }

  .login-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    
  }

  .subtitle {
    margin-top: -1rem;
  }

  .header-icon {
    margin-right: 1rem;
  }

  .icon {
    font-size: 5rem;
    color: $color-accent;
  }

  
</style>

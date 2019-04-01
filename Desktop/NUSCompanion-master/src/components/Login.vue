<template>
  <div>
    <div class="login">
      <h3>Sign in</h3>
      <input type="text" placeholder="Email">
      <br>
      <input type="password" placeholder="password">
      <br>
      <button @click="loginB">Log In</button>
    </div>
      <p>
        You don't have an account ? You can
        <router-link to="
      /sign-up">create one</router-link>
      </p>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {};
  },
  methods: {
    loginB: function() {
      //console.log("pushed")
      this.$router.push({ name: "Beneficiary" });
    },
  }
};
</script>

<style scoped>
.login {
  margin-top: 40px;
  
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}

button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}

p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
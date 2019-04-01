<template>
  <div>
    <div class="searchMod">
      <h2>
        <strong>Module Statistics and Planner</strong>
      </h2>
      <br>
      <h3>Search for a module to get more information!</h3>
      <input type="text" v-model="moduleCode" placeholder="Module Code Eg. BT2101">
      <button @click="goMod">Go</button>
    </div>
    <br>
    <!--<div class="login">
      <h3>Sign in to get personalised service!</h3>
      <input type="text" placeholder="Email">
      <br>
      <input type="password" placeholder="password">
      <br>
      <button @click="goReco">Log In</button>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    moduleCode: null;
    return {};
  },
  methods: {
    goMod: function() {
      //console.log("pushed")
      this.$router.push({ name: "Modules" , params: { id: this.moduleCode}});
    },
    goReco: function() {
      this.$router.push({ name: "Recommendation" });
    }
  }
};
</script>

<style scoped>
.searchMod {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}

button {
  margin-top: 20px;
  width: 5%;
  height: 60px;
  cursor: pointer;
}

p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
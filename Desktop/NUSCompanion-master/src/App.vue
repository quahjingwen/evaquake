<template>
<div id="app">
  <div id="nav">
    <Navigation></Navigation>
       <router-view/>
    <sideBar></sideBar>
     

  </div>

</div>
</template>

<script>
import Navigation from "./components/Navigation";
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    Navigation: Navigation,
    sideBar: HelloWorld
  },
  data() {
    return {
      drawer: null,
      right: false,
      left: false,
      data: null
    };
  },
  props:{
    source: String
  },
  methods:{}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 18px;
}

.sideBtn{
  float:left;
}
</style>

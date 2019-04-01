<template>
<div>
  <div class="choose">
    <h3>Help me choose my modules</h3>
    <button @click="goReco" id="close-image"><img src="../assets/selection.png" height= "200px" ></button>
  </div>
  <div class="choose2">
    <h3> Let me choose my modules! </h3>
    <button @click = "goList" id="close-image"><img src="../assets/choices.png" height= "200px" ></button>
  </div>
  </div>
</template>

<script>
export default {
  name: "choose",
  data() {
    return {};
  },
  methods: {
    goReco: function(){
      this.$router.push({ name: "Recommendation" });
    },
    goList: function(){
      this.$router.push({ name: "Choices" });
    }
  }
};
</script>

<style scoped>

.buttons{
  margin:20px;
  padding: 20px;
}

.choose{
  display:inline-block;
  margin: 30px;
  border: solid;
    border-color: darkgray;
  padding: 5px;
}
.choose2{
  display: inline-block;
  margin: 30px;
  border: solid;
  border-color: darkgray;
  padding: 5px;
}
</style>
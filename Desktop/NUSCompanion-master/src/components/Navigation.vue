<template>
  <div>
    <div class="bkgrd-img">
      <img class="logo" src="../assets/NUS logo.png" alt="NUS logo">

    </div>
  </div>
</template>


<script>
export default {
  name: "Navigation",
  data() {
    return {

    };
  },
  methods: {
    goProfile: function() {
      this.$router.push({ name: "/Profile" });
    },
    goModules: function() {
      this.$router.push({ name: "/Modules" });
    },
    goTopRatedElectives: function() {
      this.$router.push({ name: "/topRatedElectives" });
    },
    goRecommendations: function() {
      this.$router.push({ name: "/Recommendation" });
    }
  }
};
</script>

<style scoped>
/* Add a black background color to the top navigation */
.topnav {
  background-color: #333;
  overflow: hidden;
  width: 530px;
  position: fixed;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: rgba(221, 221, 221, 0.89);
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: rgb(228, 130, 19);
  color: white;
}

/* Right-aligned section inside the top navigation */
.topnav-right {
  float: left;
}

.bkgrd-img {
  background-image: url("../assets/orange.jpg");
  min-height: 200px;
  top: -2px;
  position: relative;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.ele {
  border: solid;
  border-color: black;
  border-spacing: 5px;
}

.logo {
  float: center;
  text-align: center;
  padding: 10px;
}
</style>
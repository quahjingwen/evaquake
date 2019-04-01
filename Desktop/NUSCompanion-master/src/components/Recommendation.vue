<template>
  <div>
    <div class="header">
      <h3>Recommendation of Modules</h3>
    </div><br>
    <br>
    <div class="display">
      <div class="analysis">
        <div class="analysis-header">
          <img
            class="header-image"
            src="../assets/analysis.png"
            alt="analysis picture"
            height="100px"
          >
          <h3 class="header-text">
            <strong>Analysis</strong>
          </h3>
        </div>
        <div class="analysis-text">
          <p>
            The following modules have been taken by more than
            70% of your seniors in y2s1:
          </p>
          <br>
        </div>
        <b-list-group-item class="list" v-for="mod in mods" :key="mod.id">
          <a href="#" @click="getModules(mod.code)">{{ mod.code }}</a>
        </b-list-group-item>
      </div>
      <div class="statistics">
        <div class="statistics-header">
          <h3 class="statistics-text">
            <strong>Brief Module Description</strong>
          </h3>
        </div>
        <p> <strong>{{recoMods.title}} </strong></p>
        <p> Department: {{recoMods.Department}} </p>
        <p> Module Credit: {{recoMods.MC}}</p>
        <p> {{recoMods.Description}} </p>
        
      </div>
    </div>
    <br>
  </div>
</template>
<script>
import { db } from "../firebase.js";

export default {
  name: "Recommendation",
  data() {
    return {
      labels: ["React", "Vanilla JS", "JQuery", "VueJS"],
      dataset: [5, 10, 15, 25],
      recoMods: 
        {title: "", Department:"", MC:"", Description:"",ExamDate:""}
      ,
      mods: [
        { code: "CS2010"},
        { code: "BT2102"},
        { code: "ST2334"},
        { code: "IS2101" },
        { code: "IS3103" }
      ],
      
    };
  },
  methods: {
    signOut: function() {
      //console.log("pushed")
      this.$router.push({ name: "Login" });
    },
    async getData() {
      this.data = await db
        .ref("/mods_info/data")
        .once("value")
        .then(function(snapshot) {
          // takes a snapshot of the data at that time
          var d = snapshot.val();
          // console.log("whewww")
          /*eslint-disable */
          console.log(d);
          return d;
        });
    },
    findMod: function(code) {
      /*eslint-disable */
      console.log(code);
    },
    async getModules(code) {
      await this.getData();
      // check if the code did get passed into the function
      console.log(String(code));
      // datakeys is the index of each child node in the mod parent node
      var datakeys = Object.keys(this.data);
      console.log(datakeys);
      // here i am testing for the first child and seeing if it produces the module code
      console.log(this.data[datakeys[0]]["ModuleCode"]);
      //var modules = [];
      //console.log(modules);
      for (var i = 0; i < this.data.length; i++) {
        var key = datakeys[i];
        //console.log("key: " + key);
        if (this.data[key]["ModuleCode"]==(String(code))) {
          console.log(this.data[key]);
          console.log(this.data[key].Department);
          //var modinfo = this.data[key].Department
          this.recoMods.Department = this.data[key].Department;
          this.recoMods.title = code;
          console.log(this.recoMods.title);
          this. recoMods.Description = this.data[key].ModuleDescription
          console.log(this.recoMods.Description);
          console.log(this.data[key].History[0].ExamDate)
          this.recoMods.MC = this.data[key].ModuleCredit

          //this.recoMods[0] = this.data[key];
        }
      }
      console.log(this.recoMods.Department);
      return this.recoMods;
    }
  }
};
</script>

<style scoped>
.header h3 {
  float: left;
}
.header button-right {
  float: right;
}
.reco {
  border: solid;
  border-color: black;
  margin-left: 50px;
  margin-right: 50px;
  display: inline;
  overflow: auto;
}
.list:hover {
  background-color: gray;
}

.analysis {
  border: solid;
  border-color: rgb(148, 148, 148);
  display: inline-block;
  vertical-align: top;
  width: 49%;
  height: 650px;
}

.statistics {
  border: solid;
  border-color: rgb(148, 148, 148);
  display: inline-block;
  vertical-align: top;
  text-align: center;
  width: 49%;
  height: 650px;
}

.statstics-text {
  display: inline-block;
}

.statistics-img {
  display: inline-block;
}

.header-image {
  display: inline-block;
}

.header-text {
  display: inline-block;
}
</style>
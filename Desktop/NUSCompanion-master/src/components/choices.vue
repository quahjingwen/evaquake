/* eslint-disable */
<template>
  <div>
    <h1>Module Recommendations</h1>
    <br>
    <p>Type the number of MCs you wish to take for each of the electives and click on 'GET MODULES' to get going!</p>
    <p>
      <b>*Do note that NUS requires students to take minimally 18 MCs per semester</b>
    </p>

    <v-container grid-list-md text-xs>
      <v-layout row wrap class="justify-center" >
        <v-flex xs3 sm6 md3>
          <label class="label">
            <b>Programme Electives:</b>
          </label>
          <v-text-field v-model="PE_MCs" label="Number of MCs" outline></v-text-field>
        </v-flex>
        <v-flex xs4 sm6 md3>
          <label class="label">
            <b>General Electives:</b>
          </label>
          <v-text-field v-model="GE_MCs" label="Number of MCs" outline></v-text-field>
        </v-flex>
        <v-flex xs4 sm6 md3>
          <label class="label">
            <b>Unrestricted Electives:</b>
          </label>
          <v-text-field v-model="UE_MCs" label="Number of MCs" outline></v-text-field>
        </v-flex>
        <v-flex xs4 sm4 text-xs>
          <div>
            <v-btn block v-on:click="getModules()">Get Modules</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>

    <h3 class="header-text">
      <strong>Analysis</strong>
    </h3>

    <div class="analysis-text">
      <p>
        The following module recommendations are based on the past modules
        <b>Business Analytics</b> students
        took in their
        <b>2nd year</b>.
      </p>
      <h3>
        <b>Recommended Programme Elective(s):</b>
      </h3>
      <div>
        <b-list-group-item class="list" v-for="module in filtered_mods_PE" :key="module.id">
          <a href="#" @click="getDesc(module[0])">{{ module[0] }}</a>
        </b-list-group-item>
      </div>
      <h3>
        <b>Recommended General Elective(s):</b>
      </h3>
      <div>
        <b-list-group-item class="list" v-for="module in filtered_mods_GE" :key="module.id">
          <a href="#" @click="getDesc(module[0])">{{ module[0] }}</a>
        </b-list-group-item>
      </div>

      <h3>
        <b>Recommended Unrestricted Elective(s):</b>
      </h3>
      <div>
        <b-list-group-item class="list" v-for="module in filtered_mods_UE" :key="module.id">
          <a href="#" @click="getDesc(module[0])">{{ module[0] }}</a>
        </b-list-group-item>
      </div>
      <br>
      <div class="statistics">
        <div class="statistics-header">
          <h3 class="statistics-text">
            <strong>Brief Module Description</strong>
          </h3>
        </div>
        <p>
          <strong>{{recoMods.title}}</strong>
        </p>
        <p>Department: {{recoMods.Department}}</p>
        <p>{{recoMods.Description}}</p>
      </div>
    </div>
    <div class="text-xs-center"></div>
  </div>
</template>

<script>
/*eslint-disable */
import { db } from "../firebase";
export default {
  name: "Choices",
  data: () => ({
    data: null,
    descData: null,
    count: 0,
    PE_MCs: null,
    GE_MCs: null,
    UE_MCs: null,
    filtered_mods_PE: [],
    filtered_mods_GE: [],
    filtered_mods_UE: [],
    recoMods: { title: "", Department: "", MC: "", Description: "" },
    mods_taken: [
      "BT1101",
      "CS1010S",
      "MA1101R",
      "EC1301",
      "GER1000",
      "MA1521",
      "MKT1705X",
      "GEQ1000",
      "BT2101",
      "CS1020"
    ]
  }),
  props: {
    source: String
  },
  methods: {
    async getData() {
      this.data = await db
        .ref("/shannon/byMajor/Business Analytics")
        .once("value")
        .then(function(snapshot) {
          var d = snapshot.val();
          
          return d;
        });
    },
    async getModules() {
      await this.getData();
      //console.log(this.data);
      var datakeys = Object.keys(this.data);
      //console.log(datakeys);
      var modules_PE = {};
      var modules_GE = {};
      var modules_UE = {};
      //console.log(datakeys.length);
      for (var i = 0; i < datakeys.length; i++) {
        console.log("are we here");
        var key = datakeys[i];
        if (this.data[key]["stu_sem"] == "Y2S1") {
          this.count += 1;
          if (this.mods_taken.includes(this.data[key]["ModuleCode"]) == false) {
            console.log(this.data[key]["ModuleCode"]);
            //console.log(key);
            if (this.data[key]["module_type"] == "PE") {
              //if module is PE, put into PE dict
              if (modules_PE[this.data[key]["ModuleCode"]] != null) {
                //console.log('is this working2');
                modules_PE[this.data[key]["ModuleCode"]] += 1;
              } else {
                //console.log('is this working3')
                modules_PE[this.data[key]["ModuleCode"]] = 1;
              }
            } else if (this.data[key]["module_type"] == "GE") {
              //if module is PE, put into PE dict
              if (modules_GE[this.data[key]["ModuleCode"]] != null) {
                //console.log('is this working2');
                modules_GE[this.data[key]["ModuleCode"]] += 1;
              } else {
                //console.log('is this working3')
                modules_GE[this.data[key]["ModuleCode"]] = 1;
              }
            } else {
              if (modules_UE[this.data[key]["ModuleCode"]] != null) {
                //console.log('is this working2');
                modules_UE[this.data[key]["ModuleCode"]] += 1;
              } else {
                //console.log('is this working3')
                modules_UE[this.data[key]["ModuleCode"]] = 1;
              }
            }
          }
        }

        // Create modules array
        var filtered_PE = Object.keys(modules_PE).map(function(key) {
          return [key, modules_PE[key]];
        });
        var filtered_GE = Object.keys(modules_GE).map(function(key) {
          return [key, modules_GE[key]];
        });
        var filtered_UE = Object.keys(modules_UE).map(function(key) {
          return [key, modules_UE[key]];
        });

        // Sort the array based on the second element
        filtered_PE.sort(function(first, second) {
          return second[1] - first[1];
        });
        filtered_GE.sort(function(first, second) {
          return second[1] - first[1];
        });
        filtered_UE.sort(function(first, second) {
          return second[1] - first[1];
        });

        this.filtered_mods_PE = await filtered_PE.slice(0, this.PE_MCs / 4);
        this.filtered_mods_GE = await filtered_GE.slice(0, this.GE_MCs / 4);
        this.filtered_mods_UE = await filtered_UE.slice(1, 1 + this.UE_MCs / 4);
      }
    },
    async getDescData() {
      this.descData = await db
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
    async getDesc(code) {
      await this.getDescData();
      // check if the code did get passed into the function
      console.log(String(code));
      // datakeys is the index of each child node in the mod parent node
      var datakeys = Object.keys(this.descData);
      console.log(datakeys);
      // here i am testing for the first child and seeing if it produces the module code
      console.log(this.descData[datakeys[0]]["ModuleCode"]);
      //var modules = [];
      //console.log(modules);
      for (var i = 0; i < this.descData.length; i++) {
        var key = datakeys[i];
        //console.log("key: " + key);
        if (this.descData[key]["ModuleCode"] == String(code)) {
          console.log(this.descData[key]);
          console.log(this.descData[key].Department);
          //var modinfo = this.data[key].Department
          this.recoMods.Department = this.descData[key].Department;
          this.recoMods.title = code;
          console.log(this.recoMods.title);
          this.recoMods.Description = this.descData[key].ModuleDescription;
          console.log(this.recoMods.Description);

          //this.recoMods[0] = this.data[key];
        }
      }
      console.log(this.recoMods.Department);
      return this.recoMods;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  float: left;
  width: 49%;
  height: 460px;
}

.statistics {
  border: solid;
  border-color: rgb(148, 148, 148);
  display: inline-block;
  vertical-align: top;
  float: center;
  text-align: center;
  width: 49%;
  height: 460px;
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
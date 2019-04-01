<template>
  <div id="show-modules">
    <h1>Search NUS Modules</h1>
    <input type= "text" v-model="search" placeholder="search modules"/>
    <div v-for="module in filteredModules" :key="module.id" class="single-module">
      <!--  <router-link :to="'/module/'+module['.key']"> <h2>{{ module[".key"] }} </h2> </router-link> -->
      <router-link :to="'/Module/'+module.ModuleCode"> <h2>{{ module.ModuleCode }} </h2> </router-link>
        <h2>{{module.ModuleTitle}}</h2>
        <article>
        <table>
            <tr>
              <td class="p-left">
                Department: {{module.Department}}</td>
                <td class="p-right">Semester {{module['History']['0']['Semester']}}</td>
            </tr>
            <tr>
              <td class="p-left">
                Exam Date: {{module['History']['0']['ExamDate']}}</td>
              <td class="p-right">Module Credit: {{module.ModuleCredit}}</td>
            </tr>
            <tr> 
              <td class="p-left">Workload: {{module.Workload}}</td>
              <td class="p-right">SU: {{module.SU}}</td>
            </tr>
            <tr> 
              <td class="p-left">{{module.Webcast}} Available</td>
            </tr>
        </table>
        <p>{{module.ModuleDescription}}</p>
        <p>Preclusion: {{module.Preclusion}}</p>
        <p>Prerequisite: {{module.Prerequisite}}</p>
      </article>
    </div>
  </div>
</template>

<script>
//import HelloWorld from './HelloWorld'
import {db} from "@/firebase.js"
// import {seRef} from '@/firebase.js'
import {modsInfo} from '@/firebase.js'
export default {
  name: 'searchModules',
  components: {
  
  }, 
  firebase: {
    // modules: seRef
    modules: modsInfo
  },
  data () {
    return {
      search: '',
      test: 123
    }
  },
  methods:{
        async getData(){
    var data = await modsInfo.once("value")
      .then(function(snapshot) {
        var d = snapshot.val();
        // console.log("whewww")
        //console.log(d)
        return d;
      } );  
    console.log(data);
    }
  },
  computed: {
    filteredModules: function () {
      // console.log(modsInfo)
      
      // this.getData();
      return this.modules.filter((module) => {
        // return module['.key'].match(this.search.toUpperCase())
        return module.ModuleCode.match(this.search.toUpperCase())
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#show-modules {
  max-width: 800px;
  margin:0 auto;
}
.single-module {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
}
table {
    width: 100%;
}
td {
    vertical-align: top;
}
.p-left {
    text-align: left;
}
.p-right {
    text-align:right;
}
.copy {
    visibility: hidden;
}
.copy, .p-right {
    white-space: nowrap;
}
input[type=text] {
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-position: 10px 10px; 
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
}
</style>
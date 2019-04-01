<template>
  <div class="Module Recommendations">
    <button v-on:click="getModules()">Get Modules</button> <br>
    <!-- <input type='text' v-model='search' placeholder="Number of MCs"/> -->
    <h1>Module Recommendations</h1>
    <p>
      The following module recommendations are based on the past modules <br> <b>Business Analytics</b> students
      took in their <b>2nd year</b>.
          </p>
    <h3>Programme Electives (PE): </h3>
    <ul>
    </ul>
    <h3>General Electives (GE): </h3>
    <ul>
    </ul>
    <h3>Unrestricted Electives (UE): </h3>
    <ul>
    </ul>
      <div class="text-xs-center">
        
    </div>
  </div>
</template>

<script>
import {db} from "firebase";

export default {
  name: 'recommendations',
  data(){
    return{
      data: null,
      filteredData: null
    }
  },
  props: {
    msg: String
  },
  methods:{
    async getData(){
    this.data = await db
      .ref("/shannon/data/-Lb2LdxrwgAn5CahJcLc")
      .once("value")
      .then(function(snapshot) {
        var d = snapshot.val();
        // console.log("whewww")
        console.log(d)
        return d;
      });  
    },
    async getModules(){
      await this.getData();
      console.log(this.data);
      var datakeys = Object.keys(this.data);
      console.log(this.data);
      var modules={};
      console.log(modules);
      for (var i = 0; i < this.data.length; i++) {
        var key = datakeys[i];
        console.log("key: " + key);
        var sameMajor = this.data[key]['major'].match('Business Analytics');
        console.log("major: " + sameMajor);
        if(this.data[key]['stu_year'] == 2 && sameMajor == 0){
          if(modules[key] != null){
            modules[key] += 1;
          }else{
            modules[key] = 1;
          }
        }
      }
      // Create items array
      var items = Object.keys(modules).map(function(key) {
        return [key, modules[key]];
      });
      // Sort the array based on the second element
      items.sort(function(first, second) {
        return second[1] - first[1];
      });
      //eslint-disable-next-line
      console.log(items.slice(0,10))
      return items.slice(0,10);


      /* var qProfile = $q.defer();
      this.data.child('major').equalTo('Business Analytics').child('stu_year').equalTo('2').orderByChild('module_code').once("child_added", function(snapshot){
        snapshot.forEach(function(child) {
            console.log(child.val()) // NOW THE CHILDREN PRINT IN ORDER
        });
        qProfile.resolve(snapshot.val());
      }, function (errorObject) {
        qProfile.reject(errorObject);
        });
        return qProfile.promise; */
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

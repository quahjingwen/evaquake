<template>
  <div id = "ModuleStatistic2" v-if="show_2">
    
    <!-- <v-btn v-on:click="show_final_marks">Display Statistic</v-btn> -->
    <strong>Finals Marks Distribution</strong>
    <line-chart
      v-if="show_2"
      xtitle="Final Marks"
      ytitle="Count"
      :data="histData_2"
      
    >
    </line-chart>
    <div v-if="show_2">
    <br><br><strong>Here is an illustration of the positive feedback from students</strong><br><br>
    <radar-chart :chartData="this.radar_data_pos_2"></radar-chart>
    <br><br><strong>Here is an illustration of the negative feedback from students</strong><br><br>
    <radar-chart :chartData="this.radar_data_neg_2"></radar-chart>
    <br><br><strong>Faculty composition of students who have taken this module</strong><br><br>
    <pie-chart :data="pie_data_2"></pie-chart>
    </div>
    <br />
    <!-- <div v-if="std">Standard deviation is {{ std }}</div>
    <div v-if="std">Mean is {{ mean }}</div>
    <div v-if="std">Median is {{ median }}</div> -->
    <br />
    <strong>Average grade of students who have taken this module across faculties</strong><br><br>
    <bar-chart :data="bar_data_2"></bar-chart>
    <br><br>

  </div>
</template>
<style scoped>
h3 {
  margin: 40px 10px 10px;
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
<script>
//import Chart from "./components/Chart.vue";
// import { seRef } from "./firebase";
import { db } from "../firebase";
import RadarChart from './charts/radarchart.js'
//import VueChartKick from "vue-chartkick";
// console.log(LineChart)
export default {
  name: "ModuleStatistic2",
  props:['module2','module2_properties','radar_data_pos_2','radar_data_neg_2','histData_2','show_2','pie_data_2','bar_data_2'],
  components:{
    RadarChart
  },
  data() {
    return {
      show: null,
      histData: {},
      std: null,  
      mean: null,
      median: null,
      moduleslist: [],
      webcast: null,
      SU: null,
      selected_mod: null,
      radar_data_pos: {
        labels: [],
        datasets: [
                {
                label: 'What students liked about the module',
                backgroundColor: 'rgba(24,83,80,.3)',
                data: []
                },
                
            ]
        },
      radar_data_neg: {
        labels: [],
        datasets: [
                
                {
                label: 'What students did not like about the module',
                backgroundColor: 'rgba(80,10,10,.3)',
                data: []
                }
            ]
        }
    };
  },
  methods: {
    rerender() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
        // eslint-disable-next-line
        console.log("re-render start");
        this.$nextTick(() => {
          // eslint-disable-next-line
          console.log("re-render end");
        });
      });
    },
    async initate(){
      console.log("initiate data");
      await this.show_final_marks();
      await this.get_radar_data();
    },
    async get_radar_data(){
      console.log("get radar data")
      let data = await db
        .ref("/mf/data")
        .once("value")
        .then(function(snapshot) {
          var d = snapshot.val();
          return d;
        });
      var datakeys = Object.keys(data);
      var mapping_pos = {};
      var mapping_neg = {}
      for (var i = 0; i < data.length; i++) {
        var key = datakeys[i];
        //console.log(typeof this.selected_mod);
        var val_pos = data[key]["m4"];
        var val_neg = data[key]["m5"];
        var mod = data[key]["mod_class_id"];
        // console.log(mod)
        if (new String(mod).valueOf() == new String(this.selected_mod).valueOf()) {
          //count += 1;
          // console.log(mod)
          if (mapping_pos[val_pos] != null) {
            
            mapping_pos[val_pos] = mapping_pos[val_pos] + 1;
          } else {
            this.radar_data_pos.labels.push(val_pos);
            mapping_pos[val_pos] = 1;
          }
          if (mapping_neg[val_neg] != null) {
            mapping_neg[val_neg] = mapping_neg[val_neg] + 1;
          } else {
            this.radar_data_neg.labels.push(val_neg)
            mapping_neg[val_neg] = 1;
          }
          // console.log(hist)
        }
        //console.log("gg")
      }
      
      for(var label in this.radar_data_pos.labels){
        console.log(this.radar_data_pos.labels[label]);
        this.radar_data_pos.datasets[0].data.push(mapping_pos[this.radar_data_pos.labels[label]]);
      }
      for(var label_neg in this.radar_data_neg.labels){
        this.radar_data_neg.datasets[0].data.push(mapping_neg[this.radar_data_neg.labels[label_neg]]);
      }
      // this.radar_data_pos.datasets[0].data=values_pos;
      console.log("new radar data")
      console.log(this.radar_data_pos.datasets[0].data);
      // this.radar_data_neg.datasets[0].data=values_neg;
      this.show=true;
      console.log(this.radar_data_neg)
      this.rerender();
      // this.radar_data_pos.update()
        
    },
    
    async show_final_marks() {
      // eslint-disable-next-line
      console.log("help");
      console.log(this.radar_data_neg)
      let data = await db
        .ref("/se/data")
        .once("value")
        .then(function(snapshot) {
          var d = snapshot.val();
          return d;
        });
      // eslint-disable-next-line
      console.log(this.selected_mod);
      // console.log(data)
      var datakeys = Object.keys(data);
      // console.log(datakeys)
      var hist = {};
      var values = [];
      var total = 0;
      var count = 0;
      for (var i = 0; i < data.length; i++) {
        // console.log(key);
        var key = datakeys[i];
        //console.log(typeof this.selected_mod);
        var val = data[key]["final_marks"];
        var mod = data[key]["ModuleCode"];
        // console.log(mod)
        
        
        if(new String(mod).valueOf() == new String(this.selected_mod).valueOf()){
          this.std = data[key]["final_marks_std"];
        }
        if (val > 0 & (new String(mod).valueOf() == new String(this.selected_mod).valueOf())) {
          total+= val;
          count += 1;
          val = Math.ceil(val / 5) * 5;
          
          if (hist[val] != null) {
            hist[val] = hist[val] + 1;
          } else {
            hist[val] = 1;
            values.push(val);
          }
          // console.log(hist)
        }
        //console.log("gg")
      }
      this.mean = total/count;
      values.sort();
      // eslint-disable-next-line
      // console.log(values);
      var sorted_hist = {};
      for (var j = 0; j < values.length; j++) {
        sorted_hist[values[j]] = hist[values[j]];
        if(j == Math.floor(values.length/2)){
          this.median = val;
        }
        //console.log(sorted_hist);
      }
      //console.log("test");
      // console.log(this.std);
      this.histData = sorted_hist;
      //this.histData = {1:2};
      // eslint-disable-next-line
      console.log(this.histData);
      this.show = true;
      this.get_radar_data();
      this.rerender();
    }
  }
  // mount() {
  //   this.show_final_marks();
  // }
};
// next is to add filters, so that can display information by module
</script>
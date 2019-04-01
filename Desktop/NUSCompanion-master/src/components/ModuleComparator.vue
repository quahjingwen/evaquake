<template>
    <div>
        <v-app>
            <v-container fluid ma-0 pa-0>
                <v-layout row>
                <v-flex xs5>
                    <v-card v-if="show_1">
                            <v-toolbar extended flat height="25px" dark color = 'green'>
                                <v-toolbar-title class="white--text">><b><h3>Pros:</h3></b></v-toolbar-title>
                            </v-toolbar>
                            <!-- {{module1_pros}} -->
                            <ul>
                            <li align=left v-for="(key,value) in module1_pros" :key="value">
                                <b>{{value}}</b>
                                <p v-if="value=='std'">Interpretation: The standard deviation of this module is smaller, suggesting that the bellcurve of the module may be steeper </p>
                                <p v-if="value=='SU'">Interpretation: This module can be SU-ed, hence it is a safe option if you intend to use your SUs this semester </p>
                                <p v-if="value=='webcast'">Interpretation: This module can be webcasted, which is great if you prefer to sleep in or stay home </p>
                      
                            </li>
                            
                            </ul>
                            <br><br>
                            <!-- <v-list-tile
                                v-for="(key,value) in module1_pros" :key="value"
                            >
                                    <v-list-tile-content>
                                        <v-list-tile-title v-text="value"></v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile> -->
                        <v-toolbar extended flat height="25px" dark color = 'red'>
                            <v-toolbar-title class="white--text">><b><h3>Cons:</h3></b></v-toolbar-title>
                        </v-toolbar>
                        <ul>
                        <li align=left v-for="(key,value) in module1_cons" :key="value">
                            <b>{{ value }}</b>
                            <p v-if="value=='std'">Interpretation: The standard deviation of this module is larger, suggesting that the bellcurve of the module may be steeper </p>
                            <p v-if="value=='SU'">Interpretation: This module canot be SU-ed, hence there is no safety net if you flunk this mod </p>

                        </li>
                        </ul><br><br>

                    </v-card>
                
                </v-flex>
                <v-flex xs5>
                    <v-card v-if="show_1">
                        <v-toolbar extended flat height="25px" dark color = 'green'>
                            <v-toolbar-title class="white--text">><b><h3>Pros:</h3></b></v-toolbar-title>
                        </v-toolbar>
                        <!-- {{module2_pros}} -->
                        <ul>
                        <li align=left v-for="(key,value) in module2_pros" :key="value">
                            <b>{{ value }}</b>
                            <p v-if="value=='std'">Interpretation: The standard deviation of this module is smaller, suggesting that the bellcurve of the module may be steeper </p>
                            <p v-if="value=='SU'">Interpretation: This module can be SU-ed, hence it is a safe option if you intend to use your SUs this semester </p>
                            <p v-if="value=='webcast'">Interpretation: This module can be webcasted, which is great if you prefer to sleep in or stay home </p>

                        </li>
                        </ul>
                        <br><br>
                        <v-toolbar extended flat height="25px" dark color = 'red'>
                            <v-toolbar-title class="white--text">><b><h3>Cons:</h3></b></v-toolbar-title>
                        </v-toolbar>
                        <ul>
                        <li align=left v-for="(key,value) in module2_cons" :key="value">
                            <b>{{ value }}</b>
                        </li>
                        </ul> <br><br>
                    </v-card>
                </v-flex>
                </v-layout>
            </v-container>
        </v-app>

    </div>
</template>

<script>
export default{
    name: "ModuleComparator",
    props: ['show_1','module1_properties','module2_properties','module1_pros','module2_pros','module1_cons', 'module2_cons'],
    data(){
        return{
            // module1: null,
            // module2: null,
            // module1_pros: {},
            // module2_pros: {},
        }
    },
    methods: {
        compare_Mod(){
            // var stats = ['std','SU','webcast','rating']
            // var stats = ['std','SU','webcast','rating']
            var stats = ['std','SU','webcast']
            for (var i=0;i<stats.length;i++){
                var key = [stats[i]];
                var val_1 = module1_properties[key];
                var val_2 = module2_properties[key];
                if(val_1 > val_2){
                    module1_pros[key]=val_1;
                }else{
                    module1_pros[key]=val_2;
                }
            }
            var dict = module1_properties["feedback_pos"];
            var labels = Object.key(dict);
            for(var j = 0; j<labels.length; j++){
                var key_fp = labels[j];
                var total = module1_properties["vote_size"]
                console.log(total/13);
                if(dict[key_fp]>total/13){
                    module1_pros[key_fp]=true;
                }
            }
            dict = module1_properties["feedback_neg"];
            labels = Object.key(dict);
            for(j = 0; j<labels.length; j++){
                key_fp = labels[j];
                if(dict[key_fp]>5){
                    module1_cons[key_fp]=true;
                }
            }
            dict = module2_properties["feedback_pos"];
            labels = Object.key(dict);
            for(j = 0; j<labels.length; j++){
                key_fp = labels[j];
                if(dict[key_fp]>5){
                    module2_pros[key_fp]=true;
                }
            }
            dict = module2_properties["feedback_neg"];
            labels = Object.key(dict);
            for(j = 0; j<labels.length; j++){
                key_fp = labels[j];
                if(dict[key_fp]>5){
                    module2_cons[key_fp]=true;
                }
            }
        }
    }
}
</script>
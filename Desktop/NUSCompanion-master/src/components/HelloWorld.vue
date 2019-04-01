/* eslint-disable */
<template>
  <v-app id="inspire">
    <v-toolbar color="black" dark fixed app clipped-right>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"><v-img :src="require('../assets/ArmodilloLogo.png')"></v-img> </v-toolbar-side-icon>
      <v-toolbar-title>Armodillo</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" fixed app>
      <vs-avatar size="100px" :src="require('@/assets/ck.png')"/>
      <h4>Kang 师父（Shifu)</h4>
      <v-list dense class="pt-0">
        <v-list-tile v-for="link in links" :key="link" :to="{path: '/' + link.route}">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{link.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer v-model="left" temporary fixed></v-navigation-drawer>

    <v-footer color="black" class="white--text" app>
      <span>NUS Companion</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  Name: "HelloWorld",
  data: () => ({
    drawer: null,
    right: false,
    left: false,
    images: {
      logo: require('@/assets/ArmodilloLogo.png'),
      ck: require('@/assets/ck.png')
    },
    data: null,
    links: [
      { title: "Profile", route: "Profile" },
      { title: "Modules", route: "Modules" },
      { title: "Top Rated Electives", route: "TopRatedElectives" },
      { title: "Recommendation", route: "choose" }
    ]
  }),
  props: {
    source: String
  },
  methods: {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin: 45px 0 0;
  color: rgba(199, 114, 35, 0);
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
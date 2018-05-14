<template>
  <div id="app">
    <v-app>
      <v-container>
        <v-toolbar app dark flat>
          <v-toolbar-title>Dreaming of Tech</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu dark class="hidden-md-and-up" offset-y>
            <v-btn color="warning" dark slot="activator">
              Menu<v-icon class="DT_pl">fa-bars</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="item in menuItems" :key="item.title" :href="item.href">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn v-for="item in menuItems" flat :key="item.title" :href="item.href">{{item.title}}</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <router-view/>
      </v-container>
    </v-app>
  </div>

</template>

<script>
export default {
  name: 'App',
  data: () => ({
    menuItems: [
      { title: 'Register', href: '/#/register' },
      { title: 'Blog', href: '/#/blog' }
    ]
  })
}
</script>

<style>
@import url(https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);
@import url(https://fonts.googleapis.com/css?family=Montserrat:400,700);
@import url(https://fonts.googleapis.com/css?family=Titillium+Web);
@import url(https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic);
@import url(https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700);
@import url(https://cdnjs.cloudflare.com/ajax/libs/simplemde/1.11.2/simplemde.min.css);

#app {
  font-family: 'Roboto Slab', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app .container {
  width: 992px;
}

nav.toolbar {
  font-family: 'Titillium Web', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 2em;
}

nav.toolbar .toolbar__title {
  color: #fed136;
}

nav .menu, nav .toolbar__items {
  font-size: 90%;
  font-weight: 400;
  letter-spacing: 1px;
  color: white;
  font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.DT_pl {
  padding-left: 0.5em;
}
</style>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Auth from './components/Auth'
import Hello from './components/Hello'


export default {
  name: 'App',
  components: {
    Auth,
    Hello
  }
}
</script>

<style>
* {
  outline: none;
}
body {
  margin: 0;
  padding: 0;
  line-height: 1;
  font-family: Roboto, sans-serif;
  font-size: 14px;
}
#app {
  
}
</style>

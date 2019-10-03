<template>
<div id="app">
  <p>
    <router-link to="/cookbook">Go to CookBook</router-link>
  </p>
  <p>
    <router-link to="/rabbit">Go to Bar</router-link>
  </p>
  <p>
    <router-link to="/jsworkers">Go to Work</router-link>
  </p>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  methods: {
    goBack() {
      window.history.length > 1 ?
        this.$router.go(-1) :
        this.$router.push('/')
    }
  }
}
</script>

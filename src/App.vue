<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import WelcomeNav from './components/WelcomeNav.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <WelcomeNav msg="Tax clinic checklist" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/output">Output</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

nav a.router-link-exact-active {
  color: black;
  background-color: rgb(16, 151, 105);
  border-color: rgb(16, 151, 105);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  padding: 1rem;
  border: 1px solid gray;
}

nav a:first-of-type {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

nav a:last-of-type {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

<script setup>
  import {RouterLink, RouterView} from "vue-router";

</script>

<template>
  <header>
    <h1>CinéFlix</h1>
    <a href="https://www.ugc.fr/" target="_blank">Lien vers le site UGC</a>
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/recherche">Recherche</router-link>
  </nav>
  </header>

  <router-view></router-view>
</template>

<style>
</style>

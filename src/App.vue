<script setup xmlns="http://www.w3.org/1999/html">
  import {RouterLink, RouterView} from "vue-router";

</script>

<template>
  <header>
    <h1>CinéFlix</h1>
    <a href="https://www.ugc.fr/" target="_blank">Lien vers le site UGC</a>
    <p> Bienvenue sur CineFlix,
      <br> cliquez sur Recherche afin de chercher un film ! </p>
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/recherche">Recherche</router-link>
  </nav>
  </header>

  <router-view></router-view>
</template>

<style>
</style>

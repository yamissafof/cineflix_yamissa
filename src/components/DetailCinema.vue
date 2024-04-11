<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const movie = ref(null);
const router = useRouter();

onMounted(async () => {
  // Récupérer l'ID du film depuis les paramètres de l'URL
  const movieId = router.currentRoute.value.params.id;

  if (!movieId) {
    console.error('ID du film non défini dans les paramètres de l\'URL');
    return;
  }

  try {
    // Effectuer une requête à l'API pour obtenir les détails du film
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=cd101fb04d4a37358fa5ae22d9ad8e6e`);
    // Vérifier si la réponse est valide
    if (!response.ok) {
      throw new Error(`Erreur de récupération des détails du film: ${response.statusText}`);
    }
    // Stocker les détails du film dans la variable movie
    movie.value = await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film :', error);
    // Gérer les erreurs de récupération des détails du film
  }
});
</script>

<template>
  <div class="details" v-if="movie">
    <h1> Détails du film : {{ movie.title }}</h1>
    <br>
    <div class="content">
      <h3> Description : {{ movie.overview }}</h3>
      <br>
      <h3> Réalisé le : {{ movie.release_date }}</h3>
      <br>
      <h3> ID du film : {{ movie.id }}</h3>
      <br>
      <h3> Popularité du film : {{ movie.popularity }}</h3>
      <br>
    </div>

    <ul v-if="movie.cast">
      <h3> Casting : </h3>
      <li v-for="actor in movie.cast" :key="actor.id">
        <h3> {{ actor.name }} (rôle) ------> {{ actor.character }}</h3>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Chargement des détails du film...</p>
  </div>
</template>

<template>
  <div>
    <input type="text" v-model="searchQuery" @keydown.enter="recherche">
    <button @click="recherche">Rechercher</button>
    <div v-if="searchResults.length > 0">
      <h2>Résultats de la recherche :</h2>
      <ul>
        <li v-for="movie in searchResults" :key="movie.id">
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.overview }}</p>
          <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="movie.title">
          <button @click="voirDetails(movie)">Afficher le détail du film</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Aucun résultat trouvé.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const searchQuery = ref('');
const movies = ref([]);

const searchResults = computed(() => {
  return movies.value.filter(movie => movie.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const recherche = async () => {
  if (searchQuery.value.trim() === '') {
    return;
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=cd101fb04d4a37358fa5ae22d9ad8e6e&query=${searchQuery.value}`);
    const data = await response.json();
    movies.value = data.results.map(movie => ({ ...movie }));
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'API :', error);
  }
};

const voirDetails = (film) => {
  router.push({ name: 'details', params: { id: film.id, titre: film.title } });
};
</script>

<style>
/* Vos styles CSS */
</style>

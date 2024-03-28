<template>
  <div>
    <input type="text" v-model="searchQuery" @keydown.enter="search">
    <button @click="search">Rechercher</button>
    <div v-if="searchResults.length > 0">
      <h2>Résultats de la recherche :</h2>
      <ul>
        <li v-for="movie in searchResults" :key="movie.id">
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.overview }}</p>
          <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="movie.title">
          <p v-else>Image non disponible</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Aucun résultat trouvé.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      movies: [] // Données de l'API
    };
  },
  computed: {
    searchResults() {
      return this.movies.filter(movie => movie.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  methods: {
    async search() {
      if (this.searchQuery.trim() === '') {
        return; // Ne rien faire si la requête est vide
      }

      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=cd101fb04d4a37358fa5ae22d9ad8e6e&query=${this.searchQuery}`);
        const data = await response.json();
        this.movies = data.results.map(movie => ({
          ...movie,
          showDetails: false // Ajouter une propriété pour indiquer si les détails sont visibles ou non
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'API :', error);
        // Gérer les erreurs de récupération des données
      }
    },
    toggleDetails(movie) {
      movie.showDetails = !movie.showDetails; // Inverser l'état des détails du film
    }
  }
}
</script>

<style>

body {
  background-color: #282828;
  font-family: Calibri, sans-serif;
  margin: 0;
  padding: 0;
  color: white;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

input[type="text"] {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
}

h3 {
  margin-top: 0;
}

.movie-image {
  max-width: 200px;
  max-height: 300px;
}

</style>
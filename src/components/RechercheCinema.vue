<script>
export default {
  data() {
    return {
      movieName: '',
      movieData: null
    };
  },
  methods: {
    searchMovie() {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=cd101fb04d4a37358fa5ae22d9ad8e6e&query=${this.movieName}`)
          .then(response => response.json())
          .then(data => {
            this.movieData = data.results[0]; // Récupérer le premier résultat (ou adapter selon les besoins)
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des données du film :', error);
          });
    }
  }
}
</script>

<template>
    <div>
      <label for="movieName">Entrez le nom du film :</label>
      <input type="text" id="movieName" v-model="movieName">
      <button @click="searchMovie">Rechercher</button>
      <div v-if="movieData">
        <h2>{{ movieData.title }}</h2>
        <p>{{ movieData.overview }}</p>
        <img :src="'https://image.tmdb.org/t/p/w500/' + movieData.poster_path" :alt="movieData.title">
      </div>
    </div>
</template>

<style scoped>
</style>
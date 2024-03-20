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
          <button @click="toggleDetails(movie)">Afficher les détails</button>
          <div v-if="movie.showDetails">
            <!-- Afficher les détails supplémentaires du film ici -->
            <p>Date de sortie : {{ movie.release_date }}</p>
            <p>Popularité : {{ movie.popularity }}</p>
          </div>
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

/* Styles de base pour le corps de la page */

body {
  background-color: #282828;
  font-family: Arial, sans-serif; /* Utiliser une police lisible */
  margin: 0; /* Supprimer les marges par défaut du corps */
  padding: 0; /* Supprimer le rembourrage par défaut du corps */
  color: white;
}

/* Styles pour le conteneur principal de l'application Vue */
#app {
  max-width: 800px; /* Limiter la largeur du conteneur principal */
  margin: 0 auto; /* Centrer le conteneur sur la page */
  padding: 20px; /* Ajouter un peu d'espace intérieur */
}

/* Styles pour les boutons */
button {
  background-color: #007bff; /* Couleur de fond du bouton */
  color: white; /* Couleur du texte du bouton */
  border: none; /* Supprimer la bordure du bouton */
  padding: 10px 20px; /* Ajouter un peu d'espace intérieur */
  cursor: pointer; /* Définir le curseur en pointeur pour indiquer l'interaction */
  border-radius: 5px; /* Ajouter un peu de bord arrondi */
}

/* Styles pour les boutons au survol */
button:hover {
  background-color: #0056b3; /* Couleur de fond modifiée au survol */
}

/* Styles pour les entrées de texte */
input[type="text"] {
  padding: 10px; /* Ajouter un peu d'espace intérieur */
  border-radius: 5px; /* Ajouter un peu de bord arrondi */
  border: 1px solid #ccc; /* Ajouter une bordure légère */
}

/* Styles pour la liste des résultats */
ul {
  list-style: none; /* Supprimer les puces de la liste */
  padding: 0; /* Supprimer le remplissage de la liste */
}

/* Styles pour les éléments de la liste */
li {
  margin-bottom: 20px; /* Ajouter un peu d'espace sous chaque élément */
  border-bottom: 1px solid #ccc; /* Ajouter une bordure en bas de chaque élément */
  padding-bottom: 20px; /* Ajouter un peu d'espace intérieur en bas de chaque élément */
}

/* Styles pour les titres des films */
h3 {
  margin-top: 0; /* Supprimer la marge supérieure des titres */
}

/* Styles pour les images des films */
.movie-image {
  max-width: 200px; /* Limiter la largeur maximale de l'image à 200 pixels */
  max-height: 300px; /* Limiter la hauteur maximale de l'image à 300 pixels */
}



</style>
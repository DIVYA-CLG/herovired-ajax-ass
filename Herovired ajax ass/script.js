const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
const movie_new = document.getElementById('movies');
const search = document.getElementById('textdoc');
const button = document.getElementById('search');
Movies(apiUrl);
button.addEventListener('click', function() {
  const keyword = search.value;
  if (keyword !== '') {
    Movies(searchUrl + keyword);
  }
});
function Movies(url) {
  movie_new.innerHTML = '';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      movies.forEach(movie => {
        const event = document.createElement('div');
        event.className = 'movie';
        event.dataset.movieId = movie.id;
        event.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
          <div class="data">Rating : ${movie.vote_average}</div>
          <div class="overview">${movie.overview}</div>
        `;
        movie_new.appendChild(event);
       event.addEventListener('click', function() {
          const movieId = this.dataset.movieId;
          fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`)
            .then(response => response.json())
            .then(data => {
              const event = document.createElement('div');
              event.className = 'modal';
              event.innerHTML = `
                <div class="modal-content">
                  <span class="close">&times;</span>
                  <h2>${data.title}</h2>
                  <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${data.title}">
                  <p>${data.overview}</p>
                </div>
              `;
              document.body.appendChild(event);
              const closeButton = event.querySelector('.close');
              closeButton.addEventListener('click', function() {
                event.remove();
              });
            })
            .catch(error => {
              console.log(error);
            });
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
}
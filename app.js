const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

movieSearchBox.addEventListener("keyup", findMovies)

function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();
    if (searchTerm.length > 0 ) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
}
}

async function loadMovies(searchTerm) {
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=1ed491f`;
    const res = await fetch(URL)
    const data = await res.json();
    if (data.Response == "True") displayMovieList(data.Search)
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for(let i = 0; i < movies.length; i++) {
     let movieList = document.createElement("div");
     movieList.setAttribute( "id", movies[i].imdbID)
     movieList.classList.add('search-list-item');

     movieList.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${movies[i].Poster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>
     `
     searchList.appendChild(movieList)
    }
  loadMoviesDetails()
}

function loadMoviesDetails () {
  const allMovies = document.querySelectorAll(".search-list-item")
  allMovies.forEach(movie => {
    movie.addEventListener("click", async() => {
        searchList.classList.add('hide-search-list');
        movieSearchBox.value = "";
        const uerele = `https://www.omdbapi.com/?i=${movie.id}&apikey=1ed491f`;
        const result = await fetch(uerele)
        const dato = await result.json();
        console.log(dato)
        displayMovieDetails(dato)
    })
  })
}

function  displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${details.Poster}">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}

const homeURL=
  "https://api.themoviedb.org/3/movie/now_playing?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=2";
const popularURL =
  "https://api.themoviedb.org/3/movie/popular?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1";
const topratedURL =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1";
const upcomingURL =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=2";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const main = document.getElementById("main");
const form = document.getElementById("form");
const home=document.getElementById("home");
const search = document.getElementById("search");
const popular = document.getElementById("popular");
const topRated = document.getElementById("top-rated");
const upcoming = document.getElementById("upcoming");
const navbarCollapse = document.getElementById("btn");
const navbar = document.getElementById("navbar");
const movieInfo = document.getElementsByClassName("movie-info");


// initially get popular movies
getMovies(homeURL);


home.addEventListener("click",()=>{
    getMovies(homeURL);
})

popular.addEventListener("click", () => {
  getMovies(popularURL);
});

topRated.addEventListener("click", () => {
  getMovies(topratedURL);
});

upcoming.addEventListener("click", () => {
  getMovies(upcomingURL);
});

navbarCollapse.addEventListener("click", () => {
  navbar.classList.toggle("custom-nav2");
});

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showMovies(respData.results);
}

function showMovies(movies) {
  // clear main
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    const name = movie.title
      .replace(/\s+/g, "-")
      .toLowerCase()
      .replace(":", "");
    // console.log(name);
    const id = `${movie.id}-${name}`;
    const link = `https://www.themoviedb.org/movie/${id}`;
    const default_poster = "./movie_image/default_poster.jpg";

    // console.log(id);
    movieEl.innerHTML = `
            <a href = "${link}">
            <img
                src="${poster_path ? IMGPATH + poster_path : default_poster}"
                alt="${title}"
            />
            </a>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                  vote_average
                )}">${vote_average}</span>

                    <div class="overview">
                        <h3>Overview:</h3>
                        ${overview}
                    </div>
            </div>
            
        `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);

    search.value = "";
  }
});

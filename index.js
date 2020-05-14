const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "7570342a0ddc01d14364f312877712b3";

async function fetchMovie(movieId) {
  const url = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
  let res = await fetch(url);
  let movie = await res.json();
  return movie;
}

function entierAleatoire(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
   }

(async () => {
    let button = document.getElementById('randomButton')
    button.addEventListener('click', async() => {
        const id = entierAleatoire(1, 2000)
            let movie = await fetchMovie(id);

            if (movie.poster_path !== undefined){
            document.getElementById("resultRandom").innerHTML = `
            <div class="resultRandom-illustration">
                  <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}">
            </div>
            <div class="resultRandom-description">
                <h1 class="resultRandom-description-heading">${movie.original_title}</h1>
                <p class="resultRandom-description-overview">${movie.overview}</p>
                <p class="resultRandom-description-runtime"> Runtime : ${movie.runtime} minutes</p>
                <p class="resultRandom-description-releaseDate"> Release date : ${movie.release_date}</p>
                <p class="resultRandom-description-voteAverage"> Vote average : ${movie.vote_average}/10 <span>(${movie.vote_count} votes)</span></p>
            </div>`;
            } else {
                document.getElementById("resultRandom").innerHTML = `
                <div class="resultRandom-illustration">
                      <img src="default${entierAleatoire(1, 4)}.png">
                </div>
                <div class="resultRandom-description">
                    <h1 class="resultRandom-description-heading">Sorry, this movie is gone. I think it was too bad.</h1>
                </div>`;
            }
    })
})();
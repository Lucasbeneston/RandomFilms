const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "7570342a0ddc01d14364f312877712b3";

async function fetchMovie(movieId) {
  const url = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
  let res = await fetch(url);
  let movie = await res.json();
  return movie;
}

// async function fetchVideoMovie(movieId){
//     const url = `${API_URL}${movieId}/videos?api_key=${API_KEY}`;
//     let res = await fetch(url);
//     let video = await res.json();
//     return video.results[0].key;
// }


function entierAleatoire(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
   }

(async () => {
    let button = document.querySelector('.randomButton')
    let trailerButton = document.querySelector('.trailerButton')
    let alreadySeenButton = document.querySelector('.alreadySeenButton')

    // EVENT : Pour random les films au click sur le bouton "randomButton"
    button.addEventListener('click', async() => {
    const id = entierAleatoire(1, 2000) // Mettre entre 1 et lenght des id pour avoir la totalité des films
    let movie = await fetchMovie(id);

        if (movie.poster_path !== undefined){
            document.querySelector('.resultRandom-container-illustration').innerHTML = `<img class="resultRandom-illustration" src="https://image.tmdb.org/t/p/original/${movie.poster_path}">`
            document.querySelector('.resultRandom-description-heading').innerHTML = `${movie.original_title} <span>(${movie.release_date.substr(0, 4)})</span>`
            document.querySelector('.resultRandom-description-overview').innerHTML = `${movie.overview}`
            document.querySelector('.resultRandom-description-runtime').innerHTML = `Runtime : ${movie.runtime} minutes`
            document.querySelector('.resultRandom-description-voteAverage').innerHTML = `Vote average : ${movie.vote_average}/10 <span>(${movie.vote_count} votes)</span>`

            // afficher les boutons
            alreadySeenButton.style.display = "block"
            trailerButton.style.display = "block"
        } else {
            // Trouver un film qui est valide
            console.log("Pas de film")

            // A Retirer plus tard
            document.querySelector('.resultRandom-container-illustration').innerHTML = `<img class="resultRandom-illustration" src="/default${entierAleatoire(1, 4)}.png">`
            document.querySelector('.resultRandom-description-heading').innerHTML = `This film is over...`
            document.querySelector('.resultRandom-description-overview').innerHTML = ``
            document.querySelector('.resultRandom-description-runtime').innerHTML = ``
            document.querySelector('.resultRandom-description-voteAverage').innerHTML = ``
            alreadySeenButton.style.display = ""
            trailerButton.style.display = ""
        }

    // let video = await fetchVideoMovie(id)

    })


    // EVENT : Pour afficher la modal avec la bande-annonce Youtube lors d'un click sur le bouton "trailerButton"
    let modalTrailerStatus = true
    let modaleYoutube = document.getElementById('modalYoutube')

    trailerButton.addEventListener('click', () => {
        if (modalTrailerStatus == true){
            console.log("Ouverture modale trailer")
            modaleYoutube.style.display = "block"

            modalTrailerStatus = false
        } else {
            console.log("Fermeture modale trailer")
            modaleYoutube.style.display = ""

            modalTrailerStatus = true
        }
    })

})();
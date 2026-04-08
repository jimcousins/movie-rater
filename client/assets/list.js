const movieList = document.getElementById("movie-list");
const movieForm = document.getElementById("movie-form");

movieForm.addEventListener("submit", addMovieCardFromForm);

const movies = ["The Lego Movie", "Star Wars", "Avengers: Endgame", "Howl's Moving Castle", "Project Hail Mary", "Pinocchio"];


// ─── Movie list ───────────────────────────────────────────────────────────────

async function createMovieList(movieNames) {
    for (let i = 0; i < movieNames.length; i++) {
        const movieInfo = await getMovieInfo(movieNames[i]);
        const movieCard = createMovieCard(movieInfo);
        movieList.appendChild(movieCard);
    }
}


// ─── Create movie card ────────────────────────────────────────────────────────

function createMovieCard(data, userRating = null) {
    const column  = document.createElement("div");
    column.classList.add("col");
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.src = data.Poster;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = data.Title;
    cardBody.appendChild(cardTitle);

    const externalRating = document.createElement("p");
    externalRating.classList.add("card-text");
    externalRating.innerText = `IMDB's rating: ${data.imdbRating}/10`;
    cardBody.appendChild(externalRating);

    // Your rating text
    const yourRating = document.createElement("p");
    yourRating.classList.add("card-text");
    yourRating.innerText = userRating
        ? `Your rating: ${userRating}/10`
        : `You have not yet rated this movie`;
    cardBody.appendChild(yourRating);

    // Update rating button
    const updateButton = document.createElement("button");
    updateButton.classList.add("btn", "btn-primary", "m-1");
    updateButton.type = "button";
    updateButton.innerText = "Update Rating";
    updateButton.addEventListener("click", () => {
        const newRating = prompt("Enter your new rating (0-10):");
        if (newRating !== null && !isNaN(newRating) && newRating >= 0 && newRating <= 10) {
            yourRating.innerText = `Your rating: ${newRating}/10`;
        } else if (newRating !== null) {
            alert("Please enter a valid rating between 0 and 10.");
        }
    });
    cardBody.appendChild(updateButton);

    const year = document.createElement("p");
    year.classList.add("card-text");
    year.innerText = `Released: ${data.Year}`;
    cardBody.appendChild(year);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "m-1");
    deleteButton.type = "button";
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => column.remove());
    cardBody.appendChild(deleteButton);

    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(cardBody);
    column.appendChild(cardDiv);

    return column;
}


// ─── Fetch movie info from OMDB ───────────────────────────────────────────────

async function getMovieInfo(name) {
    name = name.replaceAll(" ", "+");
    const resp = await fetch(`http://www.omdbapi.com/?apikey=a0692506&t=${name}`);
    if (resp.ok) {
        return await resp.json();
    } else {
        return { error: "Could not speak to the omdbapi" };
    }
}


// ─── Add movie from form ──────────────────────────────────────────────────────

async function addMovieCardFromForm(e) {
    e.preventDefault();
    const name   = e.target.movieName.value;
    const rating = e.target.movieRating.value;

    e.target.movieName.value   = "";
    e.target.movieRating.value = "";

    const data = await getMovieInfo(name);
    const card = createMovieCard(data, rating);
    movieList.appendChild(card);
}


// ─── Theme ────────────────────────────────────────────────────────────────────

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);


// ─── Init ─────────────────────────────────────────────────────────────────────

createMovieList(movies);
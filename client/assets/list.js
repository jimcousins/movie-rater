const movieList = document.getElementById("movie-list");
const movieForm = document.getElementById("movie-form");

movieForm.addEventListener("submit", addMovieCardFromForm);

const movies = [
    "Blinding Lights",
    "As It Was",
    "Levitating",
    "One Dance",
    "Titanium",
    "Sunflower"
];


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
    cardImage.src = data.artworkUrl100 || "";
    cardImage.alt = data.trackName || "Song artwork";

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = data.trackName || "Unknown Song";
    cardBody.appendChild(cardTitle);

    const artist = document.createElement("p");
    artist.classList.add("card-text");
    artist.innerText = `Artist: ${data.artistName || "Unknown Artist"}`;
    cardBody.appendChild(artist);

    const externalRating = document.createElement("p");
    externalRating.classList.add("card-text");
    externalRating.innerText = `Genre: ${data.primaryGenreName || "Unknown Genre"}`;
    cardBody.appendChild(externalRating);

    const yourRating = document.createElement("p");
    yourRating.classList.add("card-text");
    yourRating.innerText = userRating
        ? `Your rating: ${userRating}/10`
        : `You have not yet rated this song`;
    cardBody.appendChild(yourRating);

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

    const release = document.createElement("p");
    release.classList.add("card-text");
    release.innerText = `Released: ${data.releaseDate ? data.releaseDate.slice(0, 4) : "Unknown"}`;
    cardBody.appendChild(release);

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
    name = encodeURIComponent(name);
    const resp = await fetch(`https://itunes.apple.com/search?term=${name}&media=music&entity=musicTrack&limit=1`);

    if (resp.ok) {
        const data = await resp.json();
        console.log(data);

        if (data.results.length > 0) {
            return data.results[0];
        } else {
            return { error: "No song found" };
        }
    } else {
        return { error: "Could not speak to the Apple API" };
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

// ─── AI (frontend placeholder) ───────────────────────────────────────────────

async function getAIResponse(input) {
    resp = await fetch("https://localhost:5000/chatbot", {
        method: "POST",
        body: { prompt: input }
    })

    if (resp.ok){
        text = await resp.json()
        return text
    } else{
        return "error speaking to chatbot"
    }
    

}

async function handleChat() {
    const input = document.getElementById("chat-input").value;
    const responseEl = document.getElementById("chat-response");

    responseEl.innerText = "Thinking...";

    const response = await getAIResponse(input);
    responseEl.innerText = response;
}
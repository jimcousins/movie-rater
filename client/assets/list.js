const movieList = document.getElementById("movie-list");
const movieForm = document.getElementById("movie-form");

movieForm.addEventListener("submit", addMovieCardFromForm)

const movies = ["The Lego Movie", "Star Wars", "Avengers: Endgame", "Howl's Moving Castle", "Project Hail Mary", "Pinocchio"];

async function createMovieList(movieNames) {
    // Now we loop through the movies we need to get
    for (let i = 0; i < movieNames.length; i++){
            let movieInfo = await getMovieInfo(movieNames[i]); // Get the movie name
            console.log(movieInfo);
            let movieCard = createMovieCard(movieInfo);

            movieList.appendChild(movieCard);
    }
}


function createMovieCard(data, userRating = null) {
    // In this function we will create the elements of the card to be displayed

    //To define column and the div container for the card
    const column = document.createElement("div");
    column.classList.add("col");
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    // processing card image and adding the poster
    const cardImage = document.createElement("img");
    console.log(cardImage);
    cardImage.classList.add("card-img-top")
    cardImage.src = data.Poster;

    // Processing the body with ratings title and plot summary
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = data.Title;
    cardBody.appendChild(cardTitle);

    const externalRating = document.createElement("p");
    externalRating.classList.add("card-text");

    externalRating.innerText = `IMDB's rating was ${data.imdbRating}/10`;
    cardBody.appendChild(externalRating);

    const yourRating = document.createElement("p");
    yourRating.classList.add("card-text");
    yourRating.innerText = userRating
        ? `Your rating: ${userRating}/10`
        : `You have not yet rated this movie`;
    cardBody.appendChild(yourRating);

    const updateButton = document.createElement("button");
    updateButton.classList.add("btn", "btn-primary", "m-3");
    updateButton.type = "button";
    updateButton.innerText = "Update Rating";

    updateButton.addEventListener("click", () => {
        const newRating = prompt("Enter your new rating (0-10):");
        if (newRating !== null && !isNaN(newRating) && newRating >= 0 && newRating <= 10) {
            yourRating.innerText = `Your rating: ${newRating}/10`;
        } else {
            alert("Please enter a valid rating between 0 and 10.");
        }

    });
    cardBody.appendChild(updateButton);

    const year = document.createElement("p");
    year.classList.add("card-text");
    year.innerText = `This movie was released in ${data.Year}`;
    cardBody.appendChild(year);

    //delete button

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "m-3");
    deleteButton.type = "button";
    deleteButton.innerText = "Delete";

    deleteButton.addEventListener("click", () => {
        column.remove();
    });

    
    //append everything

    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(cardBody);
    
    column.appendChild(cardDiv);
    cardBody.appendChild(deleteButton);

    return column;
}


async function getMovieInfo(name) {
    name = name.replaceAll(" ", "+") //Reformat string to be useable with api
    const resp = await fetch(`http://www.omdbapi.com/?apikey=a0692506&t=${name}`);
    if (resp.ok) {
        const data = await resp.json()
        return data
    }
    else{
        return {error: "Could not speak to the ombapi"}
    }
}


async function addMovieCardFromForm(e) {
    e.preventDefault();
    const name    = e.target.movieName.value;
    const rating  = e.target.movieRating.value;
    const user_id = localStorage.getItem('user_id');

    e.target.movieName.value   = "";
    e.target.movieRating.value = "";

    await fetch('http://localhost:3000/rating', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ movie_name: name, rating, user_id })
    });

    const data = await getMovieInfo(name);
    const card = createMovieCard(data, rating);
    movieList.appendChild(card);
}

createMovieList();



createMovieList(movies);
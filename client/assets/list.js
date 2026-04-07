const movieList = document.getElementById("movie-list");

const movies = ["The Lego Movie", "Star Wars", "Avengers: Endgame", "Howl's Moving Castle", "Project Hail Mary", "Pinocchio"];

async function createMovieList(movieNames) {
    const container = document.createElement("div");
    container.classList.add("row","row-cols-1", "row-cols-md-2", "g-4");
    // Now we loop through the movies we need to get
    for (let i = 0; i < movieNames.length; i++){
            let movieInfo = await getMovieInfo(movieNames[i]); // Get the movie name
            console.log(movieInfo);
            let movieCard = createMovieCard(movieInfo);

            container.appendChild(movieCard);
    }
    movieList.appendChild(container);
}


function createMovieCard(data) {
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
    yourRating.innerText = `You have not yet rated this movie`;
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary", "m-3");
    button.type = "button";
    button.innerText = "Update Rating";
    yourRating.appendChild(button);


    cardBody.appendChild(yourRating);

    const year = document.createElement("p");
    year.classList.add("card-text");
    year.innerText = `This movie was released in ${data.Year}`;
    cardBody.appendChild(year);

    
    //append everything

    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(cardBody);
    
    column.appendChild(cardDiv);

    return column;
}


async function getMovieInfo(name) {
    name = name.replaceAll(" ", "+") //Reformat string to be useable with api
    const resp = await fetch(`http://www.omdbapi.com/?apikey=notforyou&t=${name}`);
    if (resp.ok) {
        const data = await resp.json()
        return data
    }
    else{
        return {error: "Could not speak to the ombapi"}
    }
}


createMovieList(movies);
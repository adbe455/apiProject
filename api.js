const search = document.getElementById('search');
const searchBtn = document.getElementById('button-addon2');
const resultBox = document.getElementById('result-box')

let i = 0;
let searchType;
let infoType;
let resultsFound;
let peopleBtn = [];
// let locationsBtn = [];
// let speciesBtn = [];
// let vehiclesBtn = [];

searchBtn.addEventListener('click', runSearch); 

// Click the search button when 'Enter' is pressed in the search bar
search.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchBtn.click();
  }
});

function runSearch() {
    while (resultBox.firstChild) { 
        resultBox.removeChild(resultBox.firstChild);
    }
    if(search.value.length == 4 && /^\d+$/.test(search.value)) { //checks if the search value is a 4 digit number
        console.log('Searching for:', search.value, 'by year');
        fetchResults('year');
    } else if(search.value){
        console.log('Searching for:', search.value, 'by title');
        fetchResults('title');
    } else {
        console.log('Search is blank; searching for all titles');
        fetchResults('all');
    }
}

function fetchResults(type) {
    searchType = type
    fetch('https://ghibliapi.herokuapp.com/films').then(function(result) {
    return result.json();
    }).then(function(json) {
    checkResults(json);
    });

    resultsFound = 0;
    i = 0;
}

function checkResults(json){
    console.log(json)
    if(searchType == 'title') {
        for(; i < json.length; i++) {
            if(json[i].title.toLowerCase().includes(search.value.toLowerCase())) {
                console.log('Title match:', i, json[i].title);
                resultsFound += 1;
                displayResults(json[i]);
            }
        }
    }
    else if(searchType == 'year'){
        for(; i < json.length; i++) {
            if(json[i].release_date == search.value) {
                console.log('Year match:', i, json[i].title, json[i].release_date);
                resultsFound += 1;
                displayResults(json[i]);
            }
        }
    } else {
        for(; i < json.length; i++) {
            console.log(i, json[i].title, json[i].release_date);
            resultsFound += 1;
            displayResults(json[i]);
        }
    }
    if(resultsFound == 0) {
        // displayResults(false);
        resultBox.appendChild(document.createTextNode('No results found.'));
        console.log('No results found.')
    } else {
        resultBox.insertBefore(document.createTextNode(resultsFound + ' result(s) found.'), resultBox.childNodes[0]);
        console.log(resultsFound + ' result(s) found.');
    }
}

function displayResults(film) {
    let row = document.createElement('div');
    let col1 = document.createElement('div'); // film art
    let col2 = document.createElement('div'); // title + info
    let col3 = document.createElement('div'); // description
    let col4 = document.createElement('div');
    let image = document.createElement('img');
    let title = document.createElement('h3');
    let description = document.createElement('p')
    let director = document.createElement('p');
    let producer = document.createElement('p');
    let releaseDate = document.createElement('p');
    let rtScore = document.createElement('p');
    let br = document.createElement('br');
    let btnGroup = document.createElement('div');
    
    peopleBtn = document.createElement('button');
    // let locationsBtn = document.createElement('button');
    // let speciesBtn = document.createElement('button');
    // let vehiclesBtn = document.createElement('button');
    
    row.className = "row result";
    col1.className = "c col1 col-sm-2";
    col2.className = "c col2 col-sm-3";
    col3.className = "c col3 col-sm-5";
    col4.className = "c col4 col-sm-2";

    peopleBtn.type = "button";
    // locationsBtn.type = "button";
    // speciesBtn.type = "button";
    // vehiclesBtn.type = "button";

    peopleBtn.className = "btn btn-outline-light people";
    // locationsBtn.className = "btn btn-outline-light locations";
    // speciesBtn.className = "btn btn-outline-light species";
    // vehiclesBtn.classList = "btn btn-outline-light vehicles";

    
    peopleBtn.textContent = "People";
    // locationsBtn.textContent = "Locations";
    // speciesBtn.textContent = "Species";
    // vehiclesBtn.textContent = "Vehicles";
    
    // add btn-group-toggle for toggle buttons
    btnGroup.className = "btn-group-vertical float-right";
    btnGroup.role = "group";
    
    
    image.src = './assets/film-art/' + i + '.jpg';
    title.textContent = film.title;
    description.textContent = film.description;
    director.textContent = 'Director: ' + film.director;
    producer.textContent = 'Producer: ' + film.producer;
    releaseDate.textContent = 'Release date: ' + film.release_date;
    rtScore.textContent = 'Rotten Tomatoes score: ' + film.rt_score + '%';
    
    // if(film.people[0].includes('-')) {btnGroup.appendChild(peopleBtn)}
    // // console.log(film.people[0]);
    // // console.log(film.people[0].includes('-'));
    // if(film.locations[0].includes('-')) {btnGroup.appendChild(locationsBtn)}
    // if(film.species[0].includes('-')) {btnGroup.appendChild(speciesBtn)}
    // if(film.vehicles[0].includes('-')) {btnGroup.appendChild(vehiclesBtn)}
    
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    
    col1.appendChild(image);
    col2.appendChild(title);
    col2.appendChild(releaseDate);
    col2.appendChild(director);
    col2.appendChild(producer);
    col2.appendChild(rtScore);
    col3.appendChild(description);
    col4.appendChild(btnGroup);
    
    resultBox.appendChild(row);
    resultBox.appendChild(br);
    
    // peopleBtn.addEventListener('click', fetchInfo('people' + i))
    // peopleBtn.addEventListener('click', console.log('people' + i))
    
    let people = "people" + i;
    // let locations = "locations" + i;
    // let species = "species" + i;
    // let vehicles = "vehicles" + i;
    
    peopleBtn.id = people;
    // locationsBtn.id = locations;
    // speciesBtn.id = species;
    // vehiclesBtn.id = vehicles;
    
    // document.getElementById().addEventListener('click', () => fetchInfo("people", film.id))
}

function fetchInfo(type, id) {
    // infoType = type;
    fetch('https://ghibliapi.herokuapp.com/' + type).then(function(result) {
    return result.json();
    }).then(function(json) {
    checkResults(json);
    });
}
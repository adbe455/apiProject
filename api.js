const search = document.getElementById('search');
const searchBtn = document.getElementById('button-addon2');
const resultBox = document.getElementById('result-box')

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
    fetch('https://ghibliapi.herokuapp.com/films').then(function(result) {
    return result.json();
}).then(function(json) {
    checkResults(json, type);
});

resultsFound = 0;
i = 0;
}

let i = 0;
function checkResults(json, type){
    console.log(json)
    if(type == 'title') {
        for(; i < json.length; i++) {
            if(json[i].title.toLowerCase().includes(search.value.toLowerCase())) {
                console.log('Title match:', i, json[i].title);
                resultsFound += 1;
                displayResults(json[i]);
            }
        }
    }
    else if(type == 'year'){
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
    // let col4 = document.createElement('div');
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
    
    row.className = "row result row" + i;
    col1.className = "c col1 col-lg-2 col-sm-auto";
    col2.className = "c col2 col-lg-4 col-sm-auto";
    col3.className = "c col3 col-lg-6 col-sm-auto";
    // col4.className = "c col4 col-sm-2";

    peopleBtn.setAttribute("data-toggle", "button");

    peopleBtn.type = "button";
    // locationsBtn.type = "button";
    // speciesBtn.type = "button";
    // vehiclesBtn.type = "button";

    peopleBtn.className = "btn btn-outline-light people";
    // locationsBtn.className = "btn btn-outline-light locations";
    // speciesBtn.className = "btn btn-outline-light species";
    // vehiclesBtn.classList = "btn btn-outline-light vehicles";

    
    peopleBtn.textContent = "Characters ››";
    // locationsBtn.textContent = "Locations";
    // speciesBtn.textContent = "Species";
    // vehiclesBtn.textContent = "Vehicles";
    
    // add btn-group-toggle for toggle buttons
    btnGroup.className = "btn-group-vertical float-right";
    btnGroup.role = "group";
    
    
    image.src = './assets/film-art/' + i + '.jpg';
    image.style = "display: block";
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
    btnGroup.appendChild(peopleBtn);
    
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    // row.appendChild(col4);
    
    col1.appendChild(image);
    col2.appendChild(title);
    col2.appendChild(releaseDate);
    col2.appendChild(director);
    col2.appendChild(producer);
    col2.appendChild(rtScore);
    col3.appendChild(description);
    if(true){col3.appendChild(btnGroup)};
    
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
    
    let rowNum = "row" + i
    document.getElementById(people).addEventListener('click', () => fetchInfo("people", film.id, rowNum))
}

function fetchInfo(type, id, rowNum) {
    // let table = document.getElementsByClassName("table")[0];
    let row = document.getElementsByClassName(rowNum)[0];
    if(!row.childNodes[3]){
        // removes previous tables
        // if(table){
        //     table.parentElement.removeChild(table);
        // }
        fetch('https://ghibliapi.herokuapp.com/' + type).then(function(result) {
        return result.json();
        }).then(function(json) {
        displayInfo(json, type, id, rowNum);
        });
    } else {
        row.removeChild(row.childNodes[3]);
    }
}

function displayInfo(json, type, id, rowNum) {
    if(type === "people") {
        let peopleArray = [];
        for(let j = 0; j < json.length; j++) {
            // if(json[j].films.includes(id)) {
            //     peopleArray.push(json[j])
            // }
            for(let k = 0; k < json[j].films.length; k++) {
                if(json[j].films[k].includes(id)) {
                    peopleArray.push(json[j]);
                }
            }
        }
        console.log(peopleArray);
        if(peopleArray.length > 0) {
            // let row = document.createElement('div');
            // row.className = "row"


            let table = document.createElement('table');
            let thead = document.createElement('thead');
            let tr1 = document.createElement('tr');
            let tbody = document.createElement('tbody');
            let thName = document.createElement('th');
            let thGender = document.createElement('th');
            let thAge = document.createElement('th');
            let thEyeColor = document.createElement('th');
            let thHairColor = document.createElement('th');

            table.className = "table";

            thName.textContent = "Name";
            thGender.textContent = "Gender";
            thAge.textContent = "Age";
            thEyeColor.textContent = "Eye Color";
            thHairColor.textContent = "Hair Color";

            thName.scope = "col";
            thGender.scope = "col";
            thAge.scope = "col";
            thEyeColor.scope = "col";
            thHairColor.scope = "col";

            table.appendChild(thead);
            thead.appendChild(tr1);
            tr1.appendChild(thName);
            tr1.appendChild(thGender);
            tr1.appendChild(thAge);
            tr1.appendChild(thEyeColor);
            tr1.appendChild(thHairColor);
            table.appendChild(tbody);
            document.getElementsByClassName(rowNum)[0].appendChild(table);

            for(e of peopleArray){
                let tr = document.createElement('tr');
                let tdName = document.createElement('td');
                let tdGender = document.createElement('td');
                let tdAge = document.createElement('td');
                let tdEyeColor = document.createElement('td');
                let tdHairColor = document.createElement('td');

                tdName.textContent = e.name;
                tdGender.textContent = e.gender;
                tdAge.textContent = e.age;
                tdEyeColor.textContent =  e.eye_color;
                tdHairColor.textContent = e.hair_color;

                tbody.appendChild(tr);
                tr.appendChild(tdName);
                tr.appendChild(tdGender);
                tr.appendChild(tdAge);
                tr.appendChild(tdEyeColor);
                tr.appendChild(tdHairColor);
                
                
                // let col = document.createElement('div');
                // col.className = "col-sm-3 infocol";
                
                // let name = document.createElement('h5');
                // name.textContent = e.name;
                
                // let gender = document.createElement('p');
                // gender.textContent = "Gender: " + e.gender;
                
                // let age = document.createElement('p');
                // age.textContent = "Age: " + e.age;
                
                // let eyeColor = document.createElement('p');
                // eyeColor.textContent = "Eye color: " + e.eye_color;
                
                // let hairColor = document.createElement('p');
                // hairColor.textContent = "Hair color: " + e.hair_color;
                
                // let br = document.createElement('br');
                
                // row.appendChild(col);
                // col.appendChild(name);
                // col.appendChild(br);
                // col.appendChild(gender);
                // col.appendChild(age);
                // col.appendChild(eyeColor);
                // col.appendChild(hairColor);
                // document.getElementsByClassName(rowNum)[0].appendChild(row);
            }
        } else {
            let para = document.createElement('p');
            para.textContent = "No results found.";
            para.className = "col-sm-12 text-center";
            document.getElementsByClassName(rowNum)[0].appendChild(para);
        }
    }
}
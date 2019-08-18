const search = document.getElementById('search');
const searchBtn = document.getElementById('button-addon2');
const resultBox = document.getElementById('result-box')


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
        console.log('Search for:', search.value);
        console.log('Searching by year');
        fetchResults('year');
    } else if(search.value){
        console.log('Search for:', search.value);
        console.log('Searching by title');
        fetchResults('title');
    } else {
        console.log('Search is blank');
    }
}

function fetchResults(type) {
    let searchType = type
    fetch('https://ghibliapi.herokuapp.com/films').then(function(result) {
    return result.json();
    }).then(function(json) {
    checkResults(json);
    });

    function checkResults(json){
        // console.log(json)
        let resultsFound = 0;
        if(searchType == 'title') {
            for(let i = 0; i < json.length; i++) {
                // console.log(i);
                if(json[i].title.toLowerCase().includes(search.value.toLowerCase())) {
                    console.log('Title match:', i, json[i].title);
                    resultsFound += 1;
                    displayResults(json[i]);
                }
            }
            console.log(resultsFound, 'results found.')
        }
        else if(searchType == 'year'){
            //put stuff here
        } else {
            console.log('Error: Searchtype:', searchType);
        }
        if(resultsFound == 0) {
            displayResults(false);
        }
    }

    function displayResults(film) {
        let row = document.createElement('div');
        let col1 = document.createElement('div');
        let col2 = document.createElement('div');
        let title = document.createElement('h3');
        let description = document.createElement('p')
        let director = document.createElement('p');
        let producer = document.createElement('p');
        let releaseDate = document.createElement('p');
        let rtScore = document.createElement('p');
        let br = document.createElement('br');




        if(!film){
            document.body.appendChild(document.createTextNode('No results found.'))
        } else {
            row.className = "row result";
            col1.className = "col-sm";
            col2.className = "col-sm";


            title.textContent = film.title;
            description.textContent = film.description;
            director.textContent = 'Director: ' + film.director;
            producer.textContent = 'Producer: ' + film.producer;
            releaseDate.textContent = 'Release date: ' + film.release_date;
            rtScore.textContent = 'Rotten Tomatoes score: ' + film.rt_score;
            
            row.appendChild(col1);
            row.appendChild(col2);
            col1.appendChild(title);
            col1.appendChild(director);
            col1.appendChild(producer);
            col1.appendChild(releaseDate);
            col1.appendChild(rtScore);
            col2.appendChild(description);

            resultBox.appendChild(row);
            resultBox.appendChild(br);
        }
    }

    // let div = document.createElement('div');
    // let title = document.createElement('h3');
    // let description = document.createElement('p');
    // function displayResults(film) {
    //     if(!film) {
    //         let text = document.createTextNode('No results found');
    //         title.appendChild(text);
    //         document.body.appendChild(title);
    //     } else {
    //         title.appendChild(document.createTextNode('Title: ', film.title));
    //         description.appendChild(document.createTextNode('Description: ', film.description))

    //         div.appendChild(title);
    //         div.appendChild(description);

    //         document.body.appendChild(div);
    //     }
    // }
}
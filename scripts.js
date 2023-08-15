// console.log('baron'); //testing your js file

//globall variables
const BASE_API = "https://restcountries.com/v3.1/all";
const countries = document.querySelector('.countries');
let allCountries = [];

//api call function
const endPoints = async () =>{
    try{
        const data = await fetch(`${BASE_API}`);
        const response = await data.json();
        allCountries = response;
        response.forEach(element => {
            showCountry(element);
        });
    }catch (error){
        console.log(error);
        return error;
    }
}

//creating the div to show details about a country
const showCountry = async (data) =>{
        const country = document.createElement('div');
        country.classList.add("country");
        country.innerHTML = `<div class="countryflag">
        <img src="${data.flags.png}" alt="">
    </div>
    <div class="countryinfo">
        <h3>${data.name.common}</h3>
        <p><strong>Population: </strong>${data.population}</p>
        <p><strong>Region: </strong>${data.region}</p>
        <p><strong>Capital: </strong>${data.capital}</p>
    </div>`;

    //click functionality
    country.addEventListener('click', () => {
        window.location.href = `index2.html?country=${encodeURIComponent(JSON.stringify(data))}`;
    })
    countries.appendChild(country);
}

//elements calls
const dropdown = document.querySelector('.dropdown');
const drop = document.querySelector('.drop');
const selectRegion = document.querySelectorAll('.selectRegion');

//toggling the drop
dropdown?.addEventListener('click', () =>{
    drop.classList.toggle("show");
})

//grab the dropdown to make it dynamic
selectRegion.forEach(element =>{
    element.addEventListener('click', () =>{
        const selectedRegion = element.innerText.toLowerCase().trim();
        filterAndDisplayCountries(selectedRegion);
        drop.classList.remove("show"); 
    })
})

//filtering the countries
function filterAndDisplayCountries(region) {
    countries.innerHTML = '';
    const filteredCountries = allCountries.filter(country => {
        return country.region.toLowerCase() === region;
    });
    filteredCountries.forEach(country => {
        showCountry(country);
    });
}

//search by country
const searchBtn = document.getElementById('searchBtn');
const input = document.querySelector('.input');

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        searchCountry();
    }
})

function searchCountry() {
    const userInput = input.value.trim();
    if (userInput !== '') {
        const selectedCountry = allCountries.find(countrySearch => countrySearch.name.common.toLowerCase() === userInput.toLowerCase());
        if (selectedCountry) {
            countries.innerHTML = '';
            showCountry(selectedCountry);
        } else {
            countries.innerHTML = '<p>No matching country found!</p>';
        }
    }
}

searchBtn?.addEventListener('click', () =>{
    searchCountry();
})

endPoints();
 

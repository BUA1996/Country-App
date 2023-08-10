console.log('baron'); //testing your js file

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
            console.log('bua', element);
        });
    }catch (error){
        console.log(error);
        return error;
    }
}

//creating the div to show details about a country
function showCountry(data){
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
    countries.appendChild(country);
}

//elements calls
const dropdown = document.querySelector('.dropdown');
const drop = document.querySelector('.drop');
const selectRegion = document.querySelectorAll('.selectRegion');

//toggling the drop
dropdown.addEventListener('click', () =>{
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
const sear = document.querySelector('#search');
const input = document.querySelector('.input');

sear.addEventListener('click', () =>{
    let exp = input.value;
    console.log('baron kings', exp);
})


endPoints();
 

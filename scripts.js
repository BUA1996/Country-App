console.log('baron');
const BASE_API = "https://restcountries.com/v3.1/region/";
const countries = document.querySelector('.countries');

const endPoints = async (regions = 'africa') =>{
    try{
        const data = await fetch(`${BASE_API}${regions}`);
        const response = await data.json();
        response.forEach(element => {
            showCountry(element);
            console.log('bua', element);
        });
    }catch (error){
        console.log(error);
        return error;
    }
}

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

endPoints();

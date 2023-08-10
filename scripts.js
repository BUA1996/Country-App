console.log('baron');
const BASE_API = "https://restcountries.com/v3.1/all";
const countries = document.querySelector('.countries');

const endPoints = async () =>{
    try{
        const data = await fetch(`${BASE_API}`);
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

const dropdown = document.querySelector('.dropdown');
const drop = document.querySelector('.drop');
const selectRegion = document.querySelectorAll('.selectRegion');

dropdown.addEventListener('click', () =>{
    drop.classList.toggle("show");
})

 
selectRegion.forEach(element =>{
    element.addEventListener('click', () =>{
        const selectedRegion = element.innerText.toLowerCase().trim();
        endPoints(selectedRegion);
        drop.classList.remove("show");
        console.log('breee',element.innerText); 
    })
})


endPoints();
 

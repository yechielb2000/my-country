import { key } from './api_key';

function submitForm(){

    console.log(key)

    var search = document.getElementById("search").value;
    
    fetch("https://restcountries.eu/rest/v2/all")
    .then((result)=> result.json())
    .then((data) =>{
    
        var countryName, capital, region, timeZone, mainLanguage ;

        for (let i = 0; i < data.length; i++) {   
            if(data[i].name.toLowerCase() == search.toLowerCase()){
               countryName = data[i].name;
               capital =  data[i].capital;
               region = data[i].region;

               document.getElementById("result").innerHTML =
               `
                <p>${countryName}</p>
                <p>capital : ${capital}</p>
                <p>region : ${region}</p>
               `
            }
        }

        if(!countryName){
            alert("there is no country with the name : " + search)
        }
    })
}
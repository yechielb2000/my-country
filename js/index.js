document.getElementById('submit-button').addEventListener("click", submitForm, false);

function submitForm(){

    // console.log(api_key.api_key)

    var search = document.getElementById("search").value;
    
    fetch("https://restcountries.com/v3.1/all") //from https://restcountries.com/
    .then((result)=> result.json())
    .then((data) =>{
    
        console.log(data)
        var countryName, capital, region, timeZone, language, currency ;

        document.getElementById("result").innerHTML = 
               
               `
               <h4>result<h4>
               <iframe src="https://restcountries.com" style=" width: 60%; height: 500px;" ></iframe>
               `
               ;         
    })
}
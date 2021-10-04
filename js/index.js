

document.getElementById('submit-button').addEventListener("click", submitForm, false);

function submitForm(){

     console.log()

    var search = document.getElementById("search").value;
    
    fetch("https://restcountries.com/v3.1/all") //from https://restcountries.com/
    .then((result)=> result.json())
    .then((data) =>{
     
        var countryName, capital, region, currency, latlng ;

         for (let index = 0; index < data.length; index++) {
           
           if(search.toLowerCase().trim() == data[index]['name']['common'].toLowerCase().trim()){

            var indexInfo = data[index]

            countryName = indexInfo['name']['common']
            capital = indexInfo['capital'][0]
            region = indexInfo['region']
            latlng = [indexInfo['latlng'][0], indexInfo['latlng'][1]]

            console.log(latlng[0] + ", " + latlng[1])
            document.getElementById("result").innerHTML =               
            `
            <h3>${countryName}</h3>
            <h4>capital : ${capital}</h4>
            <h4>region : ${region}</h4>
            <iframe id="map" style=" width: 60%; height: 500px;" ></iframe> 
            `
            map(latlng[1], latlng[0])
           }
         }      
    })
}

//src="https://restcountries.com/v3.1/all"

function mapInit(lng = 0, lat = 0){

    var platform = new H.service.Platform({
        'apikey': 'WxL_1X5zBveqL0eEG41NsVRpgb2bdBzLDPyiigqESM8'
      });
    
      var maptypes = platform.createDefaultLayers();
    
      var map = new H.Map(document.getElementById('map'),
      maptypes.vector.normal.map,{zoom: 10, center: { lng: lng, lat: lat }});
}
var input = document.getElementById("search")
var divResult = document.getElementById("result")
var submit = document.getElementById('submit-button')

submit.addEventListener("click", submitForm, false);

input.addEventListener("keyup", function(event) { 
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submit-button").click();
  }
});

// loadJs('https://unpkg.com/leaflet@1.4.0/dist/leaflet.js')
loadJs('http://js.api.here.com/v3/3.0/mapsjs-core.js')
loadJs('http://js.api.here.com/v3/3.0/mapsjs-service.js')

function loadJs(link){
  var script = document.createElement('script');
  script.src = link;
  script.type = 'text/javascript'
}

function submitForm(){

  var search = input.value;
    
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

              divResult.style.border = "thick solid #000000"
              divResult.style.padding = "10px"
              divResult.style.borderRadius = "20px"
            
              divResult.innerHTML =               
              `
              <h3>${countryName}</h3>
              <h4>capital : ${capital}</h4>
              <h4>region : ${region}</h4>
              <div style="margin-left: 20%; width: 60%; height: 500px;" id="mapContainer"></div>
              `
              mapInit(latlng[0], latlng[1])
            }
          }      
      })
}

 function mapInit(varLat, varLng){
  var platform = new H.service.Platform({'apikey': 'FQaJSL8jNzYUI4_3cuA96LrSd7tmC8UtcDX_-rrdvz0'});    
  var map = new H.Map(
      document.getElementById('mapContainer'),
      platform.createDefaultLayers().vector.normal.map,{zoom: 20, center: { lat: varLat, lng: varLng }});
 }
 
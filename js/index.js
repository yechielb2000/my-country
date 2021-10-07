var input = document.getElementById("search")
var divResult = document.getElementById("result")
var submit = document.getElementById('submit-button')

submit.addEventListener("click", submitForm, false);

input.addEventListener("keyup", function(event) { 
  if (event.keyCode === 13) {
    event.preventDefault();
    submit.click();
  }
});

loadJs('http://js.api.here.com/v3/3.0/mapsjs-core.js')
loadJs('http://js.api.here.com/v3/3.0/mapsjs-service.js')

loadCss('../public/css/index.css')

function loadJs(link){
  var element = document.createElement('script')
  element.src = link
  element.type = 'text/javascript'
}

function loadCss(link){
  var element = document.createElement('link')
  element.rel = 'stylesheet'
  element.href = link
}

function submitForm(){

  var search = input.value;
    
  fetch("https://restcountries.com/v3.1/all")
   .then((result)=> result.json())
      .then((data) =>{
     
        var countryName, capital, region, latlng, flag, googleMaps;

         for (let index = 0; index < data.length; index++) {
           
            if(search.toLowerCase().trim() == data[index]['name']['common'].toLowerCase().trim()){

              var indexInfo = data[index]

              countryName = indexInfo['name']['common']
              capital = indexInfo['capital'][0]
              region = indexInfo['region']
              latlng = [indexInfo['latlng'][0], indexInfo['latlng'][1]]
              flag = indexInfo['flags']['svg']
              googleMaps = indexInfo['maps']['googleMaps']

              divResult.style.padding = "10px"
            
              divResult.innerHTML =               
              `
              <div>
                <div>
                  <h3>${countryName}</h3>
                  <h4>capital : ${capital}</h4>
                  <h4>region : ${region}</h4>
                </div>
                <div style="float:left;">
                  <img src="${flag}" alt="flag" style="width:200px;"><br>
                  <a download="flag.svg" href="${flag}"><button class="btn">download flag</button></a>
                </div>
              </div>
              <div style="margin-bottom: 20px; margin-left: 20%; width: 60%; height: 500px;" id="mapContainer"></div>
              <a target="_blank" href="${googleMaps}"><button class="btn">google maps</button></a>
              `
              mapInit(latlng[0], latlng[1])
            }
          }      
      })
}

 function mapInit(varLat, varLng){
   // this api key is expired
  var platform = new H.service.Platform({'apikey': 'FQaJSL8jNzYUI4_3cuA96LrSd7tmC8UtcDX_-rrdvz0'});    
  var map = new H.Map(
      document.getElementById('mapContainer'),
      platform.createDefaultLayers().vector.normal.map,{zoom: 7, center: { lat: varLat, lng: varLng }});
 }
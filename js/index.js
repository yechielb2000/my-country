var map
var input = document.getElementById("search")
var divResult = document.getElementById("result")
var submit = document.getElementById('submit-button')
const platform = new H.service.Platform({'apikey': 'FQaJSL8jNzYUI4_3cuA96LrSd7tmC8UtcDX_-rrdvz0'});    

const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = '../public/css/index.css'


submit.addEventListener("click", submitForm, false);

const darkModeOptions = {
  bottom: '24px',
  right: '32px',
  left: 'unset',
  time: '0.5s',
  mixColor: '#fff',
  backgroundColor: '#cfcccc',
  buttonColorDark: '#100f2c',
  buttonColorLight: '#fff', 
  saveInCookies: true, 
  label: '🌓', 
  autoMatchOsTheme: true 
}

new Darkmode(darkModeOptions).showWidget();

input.addEventListener("keyup", function(event) { 
  if (event.keyCode === 13) {
    event.preventDefault();
    submit.click();
  }
});


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
                <div class="country-info-div">
                  <div>
                    <h3>${countryName}</h3>
                    <h4>capital : ${capital}</h4>
                    <h4>region : ${region}</h4>
                  </div> 
                  <div style="margin-bottom:10px;">
                    <img src="${flag}" alt="flag" style="width:220px;"><br>
                    <a download="flag.svg" href="${flag}"><button class="btn">download flag</button></a>
                    <a target="_blank" href="${googleMaps}"><button class="btn">google maps</button></a>
                  </div>
                </div>
                <div class="map-container" id="mapContainer"></div>
              </div>
              `
              mapInit(latlng[0], latlng[1])
            }
          }      

          if(!countryName){
            alert('No country name found')
          }
        
      })
}

 function mapInit(varLat, varLng){

  var defaultLayers = platform.createDefaultLayers();
  map = new H.Map(document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,{
    center: {lat:varLat, lng:varLng},
    zoom: 7,
    pixelRatio: window.devicePixelRatio || 1
  });

  new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  map.addObject(new H.map.Rect(bounds, {
    style: {
        fillColor: 'rgba(55, 85, 170, 0.1)',
        strokeColor: 'rgba(55, 85, 170, 0.6)',
        lineWidth: 8
      }
    }
  ));

  restrictMap(map)
 }

 window.addEventListener('resize', function () {
   if(map){
      map.getViewPort().resize()
   }
 })

 function restrictMap(map){

  var bounds = new H.geo.Rect(37.829, -122.426, 37.824, -122.42);

  map.getViewModel().addEventListener('sync', function() {
    var center = map.getCenter();

    if (!bounds.containsPoint(center)) {
      if (center.lat > bounds.getTop()) {
        center.lat = bounds.getTop();
      } else if (center.lat < bounds.getBottom()) {
        center.lat = bounds.getBottom();
      }
      if (center.lng < bounds.getLeft()) {
        center.lng = bounds.getLeft();
      } else if (center.lng > bounds.getRight()) {
        center.lng = bounds.getRight();
      }
      map.setCenter(center);
    }
  });
}
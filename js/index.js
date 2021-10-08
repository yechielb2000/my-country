var map
var input = document.getElementById("search")
var divResult = document.getElementById("result")
var submit = document.getElementById('submit-button')

// this api key is expired
var platform = new H.service.Platform({'apikey': 'FQaJSL8jNzYUI4_3cuA96LrSd7tmC8UtcDX_-rrdvz0'});    

submit.addEventListener("click", submitForm, false);

input.addEventListener("keyup", function(event) { 
  if (event.keyCode === 13) {
    event.preventDefault();
    submit.click();
  }
});

loadCss('../public/css/index.css')

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
                <div style="float:left;">
                  <div>
                    <h3>${countryName}</h3>
                    <h4>capital : ${capital}</h4>
                    <h4>region : ${region}</h4>
                  </div> 
                  <div>
                    <img src="${flag}" alt="flag" style="width:220px;"><br>
                    <a download="flag.svg" href="${flag}"><button class="btn">download flag</button></a>
                    <a target="_blank" href="${googleMaps}"><button class="btn">google maps</button></a>
                  </div>
                </div>
                <div style="margin-bottom: 20px; margin-left: 20%; width: 1000px; height: 500px;" id="mapContainer"></div>
              </div>
              `
              mapInit(latlng[0], latlng[1])
            }
          }      
      })
}

 function mapInit(varLat, varLng){

  var defaultLayers = platform.createDefaultLayers();
  var map = new H.Map(document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,{
    center: {lat:varLat, lng:varLng},
    zoom: 7,
    pixelRatio: window.devicePixelRatio || 1
  });

  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

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
import _ from 'lodash';

let data;
let aqi;
let temp;
let umidità;
let pm10;
let pressione;
let status;
let nomeCittà;




let el = document.getElementById("cityName");
el.addEventListener("click", cityName, false);

function cityName() {
  let city = document.getElementById("cityNameTxt").value;

  axios.get(process.env.BASE_URL + `/feed/${city}/?token=${process.env.TOKEN}`)
            .then(response => {data = response.data;
                               aqi = _.get(data,"data.aqi");
                               temp = _.get(data,"data.iaqi.t");
                               umidità = _.get(data,"data.iaqi.h");
                               pm10 = _.get(data,"data.iaqi.pm10");
                               pressione = _.get(data,"data.iaqi.p");
                               status = _.get(data,"status");
                               nomeCittà = _.get(data,"data.city.name");
                               console.log(response.data);})
            .catch(error => {console.error(error);})

  if(status == "error"){
    alert(Object.values(data));
}
  setTimeout(createH1, 1000);
  setTimeout(function(){if(status == "error"){
      alert("C'è stato un errore:");
      alert(Object.values(data));
      status = "ok";
  }}, 1000);

  setTimeout(function(){
              let city = document.getElementById("fullCityName").innerHTML = nomeCittà;
            }, 1000);


}

function createH1(){

  let aqi1 = document.getElementById("aqi1").innerHTML = aqi;

  let temp1 = document.getElementById("temp1").innerHTML = Object.values(temp);

  let umidità1 = document.getElementById("umidità1").innerHTML = Object.values(umidità);

  let pM10 = document.getElementById("pM10").innerHTML = Object.values(pm10);

  let pressione1 = document.getElementById("pressione1").innerHTML = Object.values(temp);



  setTimeout(changeColor, 5);

}

function changeColor(){
  let box1 = document.getElementById("box1");
  let box2 = document.getElementById("box2");
  let box3 = document.getElementById("box3");
  let pm101 = Object.values(pm10);
  let tempe = Object.values(temp);

  if (aqi > 0 && aqi <=50){box1.style.backgroundColor="green";}
  else if (aqi >51 && aqi <=150){box1.style.backgroundColor="yellow";}
  else {box1.style.backgroundColor="red";}

  if (pm101 > 0 && pm101 <=50){box2.style.backgroundColor="green";}
  else if (pm101 >51 && pm101 <=150){box2.style.backgroundColor="yellow";}
  else {box2.style.backgroundColor="red";}

  if (tempe > 20 && tempe <=30){box3.style.backgroundColor="green";}
  else if (tempe >31 && tempe <=60){box3.style.backgroundColor="red";}
  else {box3.style.backgroundColor="blue";}


}


let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  let crd = pos.coords;
  let lat = crd.latitude;
  let lng = crd.longitude;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  axios.get(process.env.BASE_URL + `/feed/geo:${lat};${lng}/?token=${process.env.TOKEN}`)
            .then(response => {data = response.data;
                               aqi = _.get(data,"data.aqi");
                               temp = _.get(data,"data.iaqi.t");
                               umidità = _.get(data,"data.iaqi.h");
                               pm10 = _.get(data,"data.iaqi.pm10");
                               pressione = _.get(data,"data.iaqi.p");
                               status = _.get(data,"status");
                               nomeCittà = _.get(data,"data.city.name");
                               console.log(response.data);})
            .catch(error => {console.error(error);})

  setTimeout(function(){
              let city = document.getElementById("fullCityName").innerHTML = nomeCittà;
            }, 1000);

setTimeout(createH1, 1000);

}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

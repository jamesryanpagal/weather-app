// elements
const bg = document.querySelector(".bg");
const weatherh1 = document.querySelector(".header h1");
const weatherspan = document.querySelector(".header span");
const weathericon = document.querySelector(".icon img");
const weathertemp = document.querySelector(".icon span");
const winddeg = document.querySelector(".degree");
const windspeed = document.querySelector(".speed");
const sealevel = document.querySelector(".sealevel");

const search = document.querySelector("#search");
const searchbutton = document.querySelector("#searchbtn");
const errormsg = document.querySelector(".errormsg");

// search
searchbutton.addEventListener("click", async () => {
  if (search.value === "") {
    errormsg.innerHTML =
      "<i class='fas fa-exclamation-triangle'></i> Invalid city";
    return;
  }
  let countries = [];
  await fetch("https://restcountries.com/v2/all", {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => data.map((d) => countries.push(d.name)));
  if (countries.find((c) => c.includes(search.value))) {
    errormsg.innerHTML = "";
    weatherObj.getWeather(search.value);
  } else {
    errormsg.innerHTML =
      "<i class='fas fa-exclamation-triangle'></i> Invalid country";
  }

  search.value = "";
});

// weather details
const weatherObj = {
  key: "96e302bc4161ab03ed1277007f127bd5",
  getWeather: function (location) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.key}`
    )
      .then((details) => details.json())
      .then((data) => this.weatherDetails(data));
  },
  weatherDetails: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, sea_level } = data.main;
    const { speed, deg } = data.wind;
    const cel = temp - 273.15;
    if (description.includes("clouds")) {
      bg.innerHTML = "<img src='./images/cloudy.jpg' alt=''>";
    } else if (description.includes("sky")) {
      bg.innerHTML = "<img src='./images/sunny.jpg' alt=''>";
    } else if (description.includes("rainy")) {
      bg.innerHTML = "<img src='./images/rainy.jpg' alt=''>";
    } else {
      bg.innerHTML = "<img src='./images/sunny.jpg' alt=''>";
    }
    weatherh1.innerText = "Weather in ";
    weatherspan.innerText = name;
    weathericon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weathertemp.innerText = `${cel.toString().substring(0, 4)}c`;
    winddeg.innerText = `Degree: ${deg}`;
    windspeed.innerText = `Speed: ${speed}`;
    if (!sea_level) {
      sealevel.innerText = `Sea level: No result`;
    } else {
      sealevel.innerText = `Sea level: ${sea_level}`;
    }
  },
};

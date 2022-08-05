const searchBtn = document.getElementById("search-btn");
const countryInp = document.getElementById("country-inp");
const result = document.getElementById("result");
let countryTime = "";
let continent = "";
let country = "";
let area = "";

countryInp.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    // e.preventDefault();
    returnData();
  }
});

const returnData = function () {
  const countryName = countryInp.value;
  const finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true
    `;
  console.log(finalURL);

  fetch(finalURL).then((response) =>
    response
      .json()
      .then((data) => {
        console.log(data[0]);
        console.log(data[0].continents[0]);
        console.log(data[0].name.common);
        console.log(data[0].capital[0]);
        continent = data[0].continents[0];
        country = data[0].name.common;
        area = data[0].capital[0];
        getCountryTime(continent, country, area);
        // console.log(data[0].capital[0]);
        // console.log(data[0].flags.svg);
        // console.log(data[0].name.common);
        // console.log(data[0].continents[0]);
        // console.log(Object.keys(data[0].currencies)[0]);
        // console.log(
        //   Object.keys(data[0].currencies[Object.keys(data[0].currencies)].name)
        // );
        // console.log(
        //   Object.values(data[0].languages).toString().split(",").join(", ")
        // );
        result.innerHTML = `<img src="${data[0].flags.svg}" class="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
          <h4>Capital:</h4>
          <span>${data[0].capital[0]}</span>
        </div>
        <div class="wrapper">
          <h4>Continent:</h4>
          <span>${data[0].continents[0]}</span>
        </div>
        <div class="wrapper">
          <h4>Population:</h4>
          <span>${data[0].population.toLocaleString(undefined)}</span>
        </div>
        <div class="wrapper">
        <h4>Currency:</h4>
        <span>${data[0].currencies[Object.keys(data[0].currencies)].name} -
          ${Object.keys(data[0].currencies)[0]} </span>
      </div>
      <div class="wrapper">
      <h4>Common language(s):</h4>
      <span>${Object.values(data[0].languages)
        .toString()
        .split(",")
        .join(", ")} </span>
    </div>
    <div class="wrapper">
    <h4>Timezone:</h4>
    <span>${data[0].timezones[0]} </span>
  </div>
  <div class="wrapper">
    <h4>Current Time:</h4>
    <span>${countryTime}</span>
  </div>`;
      })
      .catch(() => {
        if (countryName.length === 0) {
          result.innerHTML = `<h3> Country name cannot be left blank </h3>`;
        } else {
          result.innerHTML = `<h3> Please enter a valid country name.`;
        }
      })
  );
};

// https://worldtimeapi.org
const getCountryTime = function (continent, country, area) {
  const url = `http://worldtimeapi.org/api/${continent}/${country}/${area}`;
  //   const url = `http://worldtimeapi.org/api/timezone/America/Argentina/Salta`;
  fetch(url).then((response) =>
    response.json().then((data) => {
      console.log(data);
      console.log(
        new Date(data.unixtime * 1000).toLocaleString("gb-UK", {
          hour: "numeric",
          minute: "numeric",
        })
      );
      countryTime = new Date(data.unixtime * 1000).toLocaleString("gb-UK", {
        hour: "numeric",
        minute: "numeric",
      });
      toString(countryTime);
      //   countryTime.slice(15, 23);
      console.log(typeof countryTime);
    })
  );
};

searchBtn.addEventListener("click", returnData);

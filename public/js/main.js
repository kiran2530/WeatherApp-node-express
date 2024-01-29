const curdate = document.getElementById("date");
const weathercon = document.getElementById("weathercon");

const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const cityInfo = document.getElementById('cityInfo');
const curTemp = document.getElementById('curTemp');
const min_max_temp = document.getElementById('min_max_temp');

// ------------------ Code for Date and Time --------------------


const getCurrentDay = () => {
    let weekday = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATDAY",
    ];

    let currentTime = new Date();
    // console.log(weekday[currentTime.getDay()]);
    let day = weekday[currentTime.getDay()];
    return day;
};

const getCurrentTime = () => {
    let monthName = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUNE",
        "JULY",
        "AUG",
        "SEPT",
        "OCT",
        "NOV",
        "DEC",
    ];
    let now = new Date();
    let month = monthName[now.getMonth()];
    let date = now.getDate();

    let hours = now.getHours();
    let mins = now.getMinutes();
    let periods = "AM";

    if (hours > 11) {
        periods = "PM";
        if (hours > 12) hours -= 12;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    // console.log(month + "/" + date);
    // console.log(hours + ":" + mins + " " + periods);
    return `${month} ${date} | ${hours}:${mins}${periods}`;
};
// getCurrentDay();
// getCurrentTime();
curdate.innerHTML = getCurrentDay() + " | " + getCurrentTime();

// ------------ Code for real time Weather data ----------------

const getINfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === "") {
        cityInfo.innerHTML = "Please Enter City name";
        curTemp.innerHTML = "";
        min_max_temp.innerHTML = "";
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=0440be1ba2d1c55f52e0c0e7f89e9f98`

            const response = await fetch(url);
            let data = await response.json();

            let temp = Math.round((data.main.temp - 273.15 + Number.EPSILON) * 100) / 100;
            let minTemp = Math.round((data.main.temp_min - 273.15 + Number.EPSILON) * 100) / 100;
            let maxTemp = Math.round((data.main.temp_max - 273.15 + Number.EPSILON) * 100) / 100;
            let location = data.name;
            let country = data.sys.country;
            let status = data.weather[0].main;

            cityInfo.innerHTML = `<i class="fas fa-street-view"></i> ${location}, ${country}`;
            curTemp.innerHTML = `${temp}&deg;C`;
            min_max_temp.innerHTML = `Min ${minTemp}&deg;C | Max ${maxTemp}&deg;C`;

            if (status == "Sunny") {
                weathercon.innerHTML =
                    '<i class="fas fa-sun" style="color: #e9b10a"></i>';
            } else if (status == "Clouds") {
                weathercon.innerHTML =
                    '<i class="fas fa-cloud" style="color: #f1f2f6"></i>';
            } else if (status == "Rainy") {
                weathercon.innerHTML =
                    '<i class="fas fa-cloud-rain" style="color: #a4b0be"></i>';
            } else {
                weathercon.innerHTML =
                    '<i class="fas fa-cloud" style="color: #44c3de"></i>';
            }

        }catch(e) {
            cityInfo.innerHTML = "Please Enter the City name properly";
            curTemp.innerHTML = "";
            min_max_temp.innerHTML = "";
            console.log(e);
        }
    }
}

submitBtn.addEventListener('click', getINfo)
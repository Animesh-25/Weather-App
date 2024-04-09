const SearchBox=document.querySelector('.input-box');
const search_button=document.getElementById("search-button");
const weather_image=document.querySelector('.Weather-Image');
const temp=document.querySelector('.temperature');
const weather_desc=document.querySelector('.description');
const humidity=document.getElementById('humidity');
const wind_speed=document.getElementById('wind');
const error_location=document.querySelector('.location_notfound')
const weatherbody=document.querySelector('.weatherbody')

// const api_key="3134c5a4d4ee5132be031bde869bd242";
// let url;
// async function findWeather(place){

//  url=`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${api_key}`;
// }
// const weather_info= await fetch(`${url}`).then(response=>response.json());

// console.log(weather_info);


// search_button.addEventListener('click',()=>{
//     findWeather(SearchBox.value)
// })

//Main Code Starts here 
document.addEventListener("DOMContentLoaded", function() {
    const api_key = "3134c5a4d4ee5132be031bde869bd242";
    let url;

    async function findWeather(place) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${api_key}`;
        const response = await fetch(url);
        const weather_info = await response.json();
        // console.log(weather_info);
        /* handling the error in the page */
        if(weather_info.cod==='404'){
            error_location.style.display="flex"
            weatherbody.style.display="none"
            console.log("City Not Found Error")
            return;
        }
        error_location.style.display="none";
        weatherbody.style.display="flex";
        temp.innerHTML=`${Math.round(weather_info.main.temp-273.15)}°C`
        weather_desc.innerHTML=`${weather_info.weather[0].description}`
        humidity.innerHTML=`${weather_info.main.humidity}%`
        wind_speed.innerHTML=`${Math.round(weather_info.wind.speed*1.609344)}kmph`

        switch(weather_info.weather[0].main){
            case 'Rain':
            weather_image.src= "/imge/rain.jpg";
        break;
            case 'Clear': 
            weather_image.src= "/imge/clear.png";
        break;
            case 'Mist':
            weather_image.src= "/imge/mist.png";
        break;
            case 'Clouds':
            weather_image.src= "/imge/cloud.png";
            break;
            case 'Haze':
            weather_image.src= "/imge/haze.png";
        break;
        }
    }

    const search_button = document.getElementById('butt'); // Change 'search_button' to 'butt'
    const SearchBox = document.querySelector('.input-box'); // Use class selector since there's no ID for input box

    if (search_button) {
        search_button.addEventListener('click', async () => {
            await findWeather(SearchBox.value);
        });
    } else {
        console.error("Element with ID 'butt' not found.");
    }
});



// Making a weather app to practice async concepts

const form = document.getElementById("weather-form");
const KEY = "";
const display = document.getElementById("weather-display");
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputVal = document.getElementById('city-input').value ;
    let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${inputVal}`
    async function GetWeather(){
        try{
            const res = await fetch(apiUrl);
            if(!res.ok){
                throw new error("Error in fetchign weather")
            }
            const data = await res.json();
            const {temp_c ,humidity ,condition} = data.current;
            display.innerHTML = `
            <div>
            <h2> Weather in ${data.location.name} </h2> 
             <h3> Temperature : ${temp_c} </h3>
             <h3> Humidity : ${humidity}  </h3>
             <h3> Condition : ${condition.text} </h3> 
             </div>`
        }
        catch(error){
            display.textContent= "Couldnt get weather !"
        }
    }
    GetWeather();
});
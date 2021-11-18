
function forcastCall(city) {
    
    var currentCall = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=44f0511b3e5c148f57e204db171b504f";
    
    fetch(currentCall) 
        .then(response => response.json())
        .then (data => {
            if (localStorage.getItem(data.name) == null ){
                localStorage.setItem(data.name , "1")
            }
            else {
                var cityNum = parseInt(localStorage.getItem(data.name));
                localStorage.setItem(data.name, ++cityNum)
            }
            console.log(localStorage)
            console.log(data)
            // getting dates down
            const d = new Date();
            var today = d.getDate();
            var month = d.getMonth()+1
            var year = d.getFullYear()
            // setting todays date
            var todaysDate = document.getElementById("todaysDate")
            todaysDate.innerHTML = month + "/" + d.getDate() + "/" + d.getFullYear()
            var dateArray = []
            // for loop to make array of future dates for 5-day forcast, else if statements to make month and year and date change accordingly
            for (let i = 1;i <= 5; i++){
                var addDate = function() {
                    date= today+i
                    dateArray.push(month+"/"+date+"/"+year)
                }
                var newMonth = function(totalDays){
                    var fiveMonth = month+1
                    var date = today + i - totalDays
                    dateArray.push(fiveMonth+"/"+date+"/"+year)
                }
                if (month == 2 && i + today <= 28){
                    addDate();
                }
                else if(month == 2 && i + today >= 29){
                    newMonth(28);
                }
                else if(month == 4 || month == 6 || month == 9 || month ==11 && today + i<= 30 ) {
                    addDate();
                }
                else if(month == 4 || month == 6 || month == 9 || month ==11 && today + i >= 31 ) {
                    newMonth(30);
                }
                else if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12 && today + i <=31 ){
                    addDate();
                }
                else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 && today + i >=32 ){
                    newMonth(31);
                }
                else if (month == 12 && today +i >=32){
                    var fiveMonth = 1
                    var date = today + i - 31
                    var newYear = year+1
                    dateArray.push(date+"/"+fiveMonth+"/"+newYear)
                }

            }
            // setting five day forcast dates
            var dateOne = document.getElementById("dateOne")
            var dateTwo = document.getElementById("dateTwo")
            var dateThree = document.getElementById("dateThree")
            var dateFour = document.getElementById("dateFour")
            var dateFive = document.getElementById("dateFive")
            dateOne.innerHTML = dateArray[0]
            dateTwo.innerHTML = dateArray[1]
            dateThree.innerHTML = dateArray[2]
            dateFour.innerHTML = dateArray[3]
            dateFive.innerHTML = dateArray[4]
            // setting todays forcast 
            var cityName = document.getElementById("cityName")
            var todaysTemp = document.getElementById("todaysTemp")
            var todaysWind = document.getElementById("todaysWind")
            var todaysHumidity = document.getElementById("todaysHumidity")
            var todaysIv = document.getElementById("todaysIv")
            cityName.innerHTML =data.name
            todaysTemp.innerHTML = "Temp: " + data.main.temp + "°F"
            todaysWind.innerHTML = "Wind: " + data.wind.speed + "mph"
            todaysHumidity.innerHTML = "Humidity:" + data.main.humidity + "%"
            // fetching the future forcast
            var futureForcastCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=minutely,hourly&units=imperial&appid=44f0511b3e5c148f57e204db171b504f"
            fetch(futureForcastCall)
                .then(response => response.json())
                .then(fiveData => {
                    console.log(fiveData)
                    // setting todays uv index
                    var uv = document.getElementById("uv")
                    if (fiveData.current.uvi < 3){
                        uv.classList.add("uvLow")
                    }
                    else if (3<= fiveData.current.uvi <6){
                        uv.classList.add("uvMod")
                    }
                    else if(6<= fiveData.current.uvi < 8) {
                        uv.classList.add("uvHigh")
                    }
                    else if (8 <= fiveData.current.uvi < 11){
                        uv.classList.add("uvVery")
                    }
                    else {
                        uv.classList.add("uvExt")
                    }


                    var fiveTempArray = []
                    var fiveWindArray = []
                    var fiveHumArray = []

                    for(let x=0; x<=4; x++){                        
                        fiveTempArray.push(fiveData.daily[x].temp.day)
                        fiveWindArray.push(fiveData.daily[x].wind_speed)
                        fiveHumArray.push(fiveData.daily[x].humidity)
                    }
                    console.log(fiveTempArray)
                    console.log(fiveWindArray)
                    console.log(fiveHumArray)
                    var tempOne = document.getElementById("tempOne")
                    var tempTwo = document.getElementById("tempTwo")
                    var tempThree = document.getElementById("tempThree")
                    var tempFour = document.getElementById("tempFour")
                    var tempFive = document.getElementById("tempFive")
                    var windOne = document.getElementById("windOne")
                    var windTwo = document.getElementById("windTwo")
                    var windThree = document.getElementById("windThree")
                    var windFour = document.getElementById("windFour")
                    var windFive = document.getElementById("windFive")
                    var humOne = document.getElementById("humidityOne")
                    var humTwo = document.getElementById("humidityTwo")
                    var humThree = document.getElementById("humidityThree")
                    var humFour = document.getElementById("humidityFour")
                    var humFive = document.getElementById("humidityFive")
                    tempOne.innerHTML= "Temp:" + fiveTempArray[0] + "°F"
                    tempTwo.innerHTML= "Temp:" + fiveTempArray[1] + "°F"
                    tempThree.innerHTML= "Temp:" + fiveTempArray[2] + "°F"
                    tempFour.innerHTML= "Temp:" + fiveTempArray[3] + "°F"
                    tempFive.innerHTML= "Temp:" + fiveTempArray[4] + "°F"
                    
                    windOne.innerHTML= "Wind:" + fiveWindArray[0] + "mph"
                    windTwo.innerHTML= "Wind:" + fiveWindArray[1] + "mph"
                    windThree.innerHTML= "Wind:" + fiveWindArray[2] + "mph"
                    windFour.innerHTML= "Wind:" + fiveWindArray[3] + "mph"
                    windFive.innerHTML= "Wind:" + fiveWindArray[4] + "mph"
                    
                    humOne.innerHTML= "Humidity:" + fiveHumArray[0] + "%"
                    humTwo.innerHTML= "Humidity:" + fiveHumArray[1] + "%"
                    humThree.innerHTML= "Humidity:" + fiveHumArray[2] + "%"
                    humFour.innerHTML= "Humidity:" + fiveHumArray[3] + "%"
                    humFive.innerHTML= "Humidity:" + fiveHumArray[4] + "%"



                    var iconOne = document.getElementById("iconOne")
                    var iconTwo = document.getElementById("iconTwo")
                    var iconThree = document.getElementById("iconThree")
                    var iconFour = document.getElementById("iconFour")
                    var iconFive = document.getElementById("iconFive")

                    var iconPicker = function(iconId) {
                        if (iconId < 299 ){
                            var icon = '<i class="fa-solid fa-poo-storm"></i>'
                            return icon
                        }
                        else if (300 <= iconId < 400) {
                            var icon = '<i class=" wi wi-cloud"></i>'
                            return icon 
                        }
                        else if (500 <= iconId < 599 ){
                            var icon = '<i class="fa-solid fa-cloud-showers-heavy"></i>'
                            return icon
                        }
                        else if (600 <= iconId < 699){
                            var icon = '<i class="fa-solid fa-snowflake"></i>'
                            return icon
                        }
                        else if (700 <= iconId < 799){
                            var icon = '<i class="fa-solid fa-smog"></i>'
                            return icon
                        }
                        else if ( iconId =800 ){
                            var icon = '<i class="fa-solid fa-sun"></i>'
                            return icon
                        }
                        else {
                            var icon = '<i class="wi wi-night-sleet"></i>'
                        }

                    }
                    var todaysIcon = document.getElementById("todaysIcon")
                    todaysIcon.innerHTML = iconPicker(fiveData.current.weather[0].id)
                    var fiveIconArray = []
                    for (let y = 0 ; y <=4 ; y++){
                        fiveIconArray.push(iconPicker(fiveData.daily[y].weather[0].id))
                    }
                    console.log(fiveIconArray)
                })
            })
}


var searchBar = document.getElementById("searchBar");
var searchButton = document.getElementById("searchButton")
searchButton.addEventListener("click", function(){
     forcastCall(searchBar.value)
})

var saveHolder1 = document.getElementById("saveHolder1")
var saveHolder2 = document.getElementById("saveHolder2")
var saveHolder3 = document.getElementById("saveHolder3")
var saveHolder4 = document.getElementById("saveHolder4")
var saveHolder5 = document.getElementById("saveHolder5")

saveHolder1.addEventListener("click", function(){
    forcastCall(saveHolder1.innerHTML)
})
saveHolder2.addEventListener("click", function(){
    forcastCall(saveHolder2.innerHTML)
})
saveHolder3.addEventListener("click", function(){
    forcastCall(saveHolder3.innerHTML)
})
saveHolder4.addEventListener("click", function(){
    forcastCall(saveHolder4.innerHTML)
})
saveHolder5.addEventListener("click", function(){
    forcastCall(saveHolder5.innerHTML)
})
var settingSuggest = function() {
    keys = Object.keys(localStorage)

   

        if (keys[0] != undefined){
            saveHolder1.innerHTML = keys[0]
        }
        if(keys[1] != undefined){
            saveHolder2.innerHTML = keys[1]
        }
        
        if (keys[2] != undefined){
            saveHolder3.innerHTML = keys[2]
        }
        if (keys[3] != undefined) {
            saveHolder4.innerHTML = keys[3]
        }
        if (keys[4] != undefined){
            saveHolder5.innerHTML = keys[4]
        }
        
}

settingSuggest()
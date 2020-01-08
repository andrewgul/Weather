window.addEventListener('load', () => { // after page loaded, we can get the location, then callback function starts (arrow function)
    let long; // longitude -- долгота
    let lat; // lattitude -- широта
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    // если браузер умеет определять геопозицию (выскочит вопрос о том можно ли использовать геопозицию пользователя)
    if (navigator.geolocation) { 
            navigator.geolocation.getCurrentPosition(position => {
            console.log(position); // можем посмотреть координаты в консоли
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/e5409b104dc1c14f7e6c9efa035abbc1/${lat},${long}`;

            fetch(api) // совершаем вызов к этому самому api, then значит, что происходит после окончания вызова (то есть код не будет выполняться, пока информация с сервера не придет)
                .then(responce =>{
                    return responce.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently; // мы берем из объекта дата.кюррентли темепературу и суммари
                    // дальше будем изменять элементы согласно инфе из API
                    temperatureDegree.textContent = "The temperature outside is " + fahToCel(temperature) + " ℃";
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    // выбираем иконку
                    setIcons(icon, document.querySelector('.icon'));
                })

        });
    } else {
        // если он не разрешит использовать геопозицию, то вместо х1 выведется это (необязательно)
        h1.textContent = "blah blah blah" 
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "black"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); // здесь ищутся все - и замняются на _
        skycons.play;
        return skycons.set(iconID, Skycons[currentIcon]);
    }
    
})

function fahToCel(temperature) {
    return Math.round((temperature - 32)*(5 / 9));
}

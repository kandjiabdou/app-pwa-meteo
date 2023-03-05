new Vue({
    el: '#app',
    data: () => ({
        data_city: "test",
        url: "https://api.openweathermap.org/data/2.5/onecall?appid=dbb76c5d98d5dbafcb94441c6a10236e&units=metric&exclude=minutely,alerts&",
        lon: "48.866667",
        lat: "2.333333",
        name: "Paris",
        description: "",
        main: "Clear",
        temp: "",
        pressure: "",
        humidity: "",
        hourly: "",
        daily: "",
        hour: "",
        days_name: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        searchTerm: '',
        cities: [],
        selectedCity: '',
        iconBaseUrl : "https://openweathermap.org/img/wn/"
    }),
    computed: {
        searchCities() {
            if (this.searchTerm === '') {
                return []
              }
              let matches = 0
              return this.cities.filter(city => {
                if (city.name.toLowerCase().includes(this.searchTerm.toLowerCase()) && matches < 10) {
                  matches++
                  return city
                }
              })
        }
    },
    async created() {
        const city_inf = { lat: this.lat, lon: this.lon, name: this.name }
        this.getDataCity(city_inf)
        await fetch('./cities.json')
            .then(response => response.json())
            .then(data => {
                this.cities = data['cities']
            })
            .catch(error => console.log(error));
    },
    methods: {
        getDataCity(city) {
            fetch(this.url + "lat="+city["lat"]+"&lon="+city['lon']+"&")
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data)
                    this.name = city["name"];
                    this.description = data.current.weather[0].description;
                    this.temp = Math.round(data.current.temp);
                    this.pressure = data.current.pressure;
                    this.humidity = data.current.humidity;
                    this.main = data.current.weather[0].main;
                    this.hour = data.current.dt
                    this.hourly = data.hourly
                    this.daily = data.daily

                    switch (this.main) {
                        case "Snow":
                            document.getElementById("wrapper-bg").style.backgroundImage =
                                "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
                            break;
                        case "Clouds":
                            document.getElementById("wrapper-bg").style.backgroundImage =
                                "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
                            break;
                        case "Fog":
                            document.getElementById("wrapper-bg").style.backgroundImage =
                                "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
                            break;
                        case "Rain":
                            document.getElementById("wrapper-bg").style.backgroundImage =
                                "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
                            break;
                        case "Clear":
                            document.getElementById("wrapper-bg").style.backgroundImage =
                                "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
                            break;
                        case "Thunderstorm":
                            document.getElementById("wrapper-bg").style.backgroundImage =
                                "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
                            break;
                        default:
                            document.getElementById("wrapper-bg").style.backgroundImage =
                                "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
                            break;
                    }
                })
        },
        setHour(datetime) {
            return new Date(datetime * 1000).getHours()
        },
        roundTemp(tmp) {
            return Math.round(tmp)
        },
        getHour(h) {
            const d = new Date(h * 1000)
            const th = d.getHours()
            let tm = d.getMinutes()
            if (tm <= 10) tm = "0" + tm.toString()
            return th + ":" + tm
        },
        getDay(d) {
            const dayint = new Date(d * 1000).getDay()
            return this.days_name[dayint]
        },
        selectCity(city){
            // const city_inf = { lat: city["latitude"], lon: city["longitude"], name: city["name"] }
            this.getDataCity(city)
        }
    }
})
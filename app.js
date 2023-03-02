new Vue({
    el: '#app',
    data: () => ({
        data_city: "test",
        url: "https://api.openweathermap.org/data/2.5/onecall?appid=dbb76c5d98d5dbafcb94441c6a10236e&units=metric&exclude=minutely,alerts&",
        lon: "lat=48.866667&",
        lat: "lon=2.333333&",
        name : "",
        description : "",
        temp : "",
        pressure : "",
        humidity : "",
        hourly : ""
    }),
    created() {
        this.getDataCity(this.lat, this.lon)
    },
    methods: {
        getDataCity(lat, lon){
            fetch(this.url + lat + lon)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.name = "Warsaw";
                this.description = data.current.weather[0].description;
                this.temp = Math.round(data.current.temp);
                this.pressure = data.current.pressure;
                this.humidity = data.current.humidity;
                this.main = data.current.weather[0].main;
                this.hourly = data.hourly
            })
        },
        setHour(datetime){
            // console.log(datetime)
            // console.log(new Date(datetime).getHours())
            // console.log(new Date(datetime).toString())
            return new Date(datetime).getHours()
        }, 
        roundTemp(tmp){
            return Math.round(tmp)
        }
    },
    computed: {
    }
})
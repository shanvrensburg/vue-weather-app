const app = new Vue({
	el:'#app',
	data:{
		loading:true,
		status:'Loading...',
		lat:null,
		lon:null,
		location:null,
		temp:null,
		temp_low:null,
		temp_high:null,
		images:{
			"rain":[
				"clouds.jpg"
			]
		}
	},
	created() {
		navigator.geolocation.getCurrentPosition(pos => {
			console.log('got coordinates', pos.coords);
			this.lat = pos.coords.latitude;
			this.lon = pos.coords.longitude;
			this.loadWeather();
		})
	},
	methods:{
		loadWeather() {

			axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=cape%20town,RSA&appid=cfffb335259244d7f4a0fa8c4b05a5e1&units=metric`)
			.then(res => {
                let weatherData = res.data;
                let currentForecast = weatherData.list[0]

				console.log(res.data)
				this.location = weatherData.city + ", " + weatherData.country
                this.temp = currentForecast.main.temp
                // console.log(this.temp)
				this.temp_low = currentForecast.main.temp_min
				this.temp_high = currentForecast.main.temp_max
				// // this.desc = forecast.item.condition.text;
				// this.loading = false;
				this.loading = false;
			})
			.catch(e => {
                this.status = 'Failed to get accurate weather forecast. Please try again later';
				console.error(e);
			});
				
		}
	}

});
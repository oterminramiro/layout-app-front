<template>
	<div class="container">
		<notifications group="foo" position="top bottom" classes="vue-notification mt-3" width='90%'/>
		<div class="row">
			<div class="col mx-auto px-0 my-5">
				<div class="text-center mx-auto">
					<img class="img-fluid w-75" src="~/assets/undraw_preferences.svg" />
					<h2 class="my-5">Select your organization:</h2>
				</div>

				<div class="text-center mx-auto w-75">
					<b-form @submit="onSubmit">
						<label for="organizationinput">Elegi donde:</label>
						<b-form-select id="organizationinput" class="mb-3" :options="organizations" @change='getLocations($event)' required></b-form-select>

						<b-form-select class="my-3" v-show="locations.length > 0" :options="locations" @change='setLocation($event)' required></b-form-select>


						<label for="spinbutton">Cantidad de personas:</label>
						<b-form-spinbutton id="sppinbutton" v-model="people" min="1" max="5" required></b-form-spinbutton>

						<div class="my-3" style="">
							<label for="datepicker">Dia:</label>
							<date-picker id="datepicker"
								v-model="date"
								:placeholder="'Dia'"
								:language="es"
								:format="'yyyy MM dd'"
								:bootstrap-styling="true"
								:calendar-button="true"
								:disabled-dates="disabled_dates"
							></date-picker>
						</div>

						<div class="my-3">
							<label for="timepicker">Hora:</label>
							<time-picker id="timepicker"
								close-on-complete
								v-model="time"
								:placeholder="'Hora'"
								:input-width="'100%'"
								:input-class="['form-control']"
							></time-picker>
						</div>

						<b-button type="submit" variant="outline-dark" class="my-3 px-5" >Continuar</b-button>
					</b-form>
				</div>

				<div v-html="error" class="my-3">{{ error }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import {es} from 'vuejs-datepicker/dist/locale'
import Notifications from 'vue-notification';

export default {
	middleware: 'checkToken',
	data(){
		var today_date = new Date();
		var today_date_less_1 = new Date(today_date.getTime() - (24*60*60*1000));
		return {
			es:es,
			organizations: [],
			locations: [],
			people: 1,
			error: '',
			link_slug: '',
			date: null,
			time: null,
			disabled_dates: {
				to: today_date_less_1,
			}
		}
	},
	methods: {
		getLocations: function(event){
			this.error = ''
			var token = localStorage.getItem('jwt_token')

			var data = JSON.stringify( { "guid":event } );
			var config = {
				method: 'post',
				url: 'http://localhost:8000/api/main/get_locations',
				headers: {
					'x-auth-token': token,
					'Content-Type': 'application/json',
				},
				data: data
			};

			axios(config)
			.then(response => {
				console.log(response.data)
				if(response.data.data.length == 0)
				{
					console.log('no data')
					this.error = 'Esta organizacion no tiene locations'
				}
				else
				{
					response.data.data.forEach((item, i) => {
						this.locations.push({
							'value': item.guid,
							'text': item.name,
						})
					});
				}
			})
			.catch(function (error) {
				console.log(error)
				this.error = 'Error'
			});
		},
		setLocation: function(event){
			this.link_slug = event
		},
		onSubmit: function(){
			event.preventDefault();
			console.log(this.date)
			if(this.date == null)
			{
				this.$notify({
					group: 'foo',
					title: 'Error',
					text: 'Dia incompleto',
					type: 'error',
				});
			}
			if(this.time == null)
			{
				this.$notify({
					group: 'foo',
					title: 'Error',
					text: 'Hora incompleta',
					type: 'error',
				});
			}

			if(this.time != null && this.date != null)
			{
				var time_format = this.time.HH + ":" + this.time.mm
				var regex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/
				if(!regex.test(time_format))
				{
					this.$notify({
						group: 'foo',
						title: 'Error',
						text: 'Hora incompleta',
						type: 'error',
					});
				}
				else
				{
					let formatted_date = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate()
					let formatted_time = time_format + ":00"

					let timestamp = formatted_date + " " + formatted_time

					var data = {
						location: this.link_slug,
						people: this.people,
						date: formatted_date,
					}
					localStorage.setItem("layout_request", JSON.stringify(data) );
					this.$router.push('/layout/'+this.link_slug)
				}
			}
		},
	},
	created(){
		var token = localStorage.getItem('jwt_token')
		var config = {
			method: 'get',
			url: 'http://localhost:8000/api/main/get_organizations',
			headers: {
				'x-auth-token': token,
			}
		};
		axios(config)
		.then(response => {
			response.data.data.forEach((item, i) => {
				this.organizations.push({
					'value': item.guid,
					'text': item.name,
				})
			});
		})
	}
}
</script>

<style>


</style>

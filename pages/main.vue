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
					<b-form @submit="onSubmit" id="mainForm">

						<label for="organizationinput">Elegi donde:</label>
						<b-form-select id="organizationinput" class="mb-3" :options="responses.organizations" @change='getLocations' v-model="data.organization" required></b-form-select>

						<b-form-select class="my-3" v-show="responses.locations.length > 0" :options="responses.locations" @change='getTimes' v-model="data.location" required></b-form-select>

						<div v-show="data.location">

							<label for="spinbutton">Cantidad de personas:</label>
							<b-form-spinbutton id="sppinbutton" v-model="data.people" min="1" max="5" required></b-form-spinbutton>

							<div class="my-3" style="">
								<label for="datepicker">Dia:</label>
								<date-picker id="datepicker"
								v-model="data.date"
								:placeholder="'Dia'"
								:language="es"
								:format="'yyyy MM dd'"
								:bootstrap-styling="true"
								:calendar-button="true"
								:disabled-dates="disabled_dates"
								></date-picker>
							</div>

							<label for="timeinput">Hora:</label>
							<b-form-select id="timeinput" class="mb-3" :options="responses.times" v-model="data.time" required></b-form-select>

							<b-button type="submit" variant="outline-dark" class="my-3 px-5" >Continuar</b-button>
						</div>
					</b-form>
				</div>
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
			disabled_dates: {
				to: today_date_less_1,
			},
			responses: {
				organizations: [],
				locations: [],
				times: [],
			},
			data: {
				organization: null,
				location: null,
				people: 1,
				date: null,
				time: null,
			},
		}
	},
	methods: {
		getLocations: function(){
			var token = localStorage.getItem('jwt_token');

			var data = JSON.stringify( { "guid": this.data.organization } );
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
				if(response.data.data.length == 0)
				{
					this.$notify({
						group: 'foo',
						title: 'Error',
						text: 'Esta organizacion no tiene locations',
						type: 'error',
					});
				}
				else
				{
					response.data.data.forEach((item, i) => {
						this.responses.locations.push({
							'value': item.guid,
							'text': item.name,
						})
					});
				}
			})
			.catch(function (error) {
				this.$notify({
					group: 'foo',
					title: 'Error',
					text: error,
					type: 'error',
				});
			});
		},
		getTimes: function(){
			var token = localStorage.getItem('jwt_token');

			var data = JSON.stringify( { "guid": this.data.location } );
			var config = {
				method: 'post',
				url: 'http://localhost:8000/api/main/get_time',
				headers: {
					'x-auth-token': token,
					'Content-Type': 'application/json',
				},
				data: data
			};

			axios(config)
			.then(response => {
				response.data.data.forEach((item, i) => {
					this.responses.times.push({
						'value': item,
						'text': item,
					})
				});
			})
			.catch(function (error) {
				this.$notify({
					group: 'foo',
					title: 'Error',
					text: error,
					type: 'error',
				});
			});
		},
		onSubmit: function(){
			event.preventDefault();

			if(this.data.date == null)
			{
				this.$notify({
					group: 'foo',
					title: 'Error',
					text: 'Dia incompleto',
					type: 'error',
				});
			}
			else
			{
				let formatted_date = this.data.date.getFullYear() + "-" + (this.data.date.getMonth() + 1) + "-" + this.data.date.getDate()
				let formatted_time = this.data.time + ":00"
				let timestamp = formatted_date + " " + formatted_time

				var data = {
					location: this.data.location,
					people: this.data.people,
					date: timestamp,
				}
				localStorage.setItem("layout_request", JSON.stringify(data) );
				this.$router.push('/layout/'+this.link_slug)
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
				this.responses.organizations.push({
					'value': item.guid,
					'text': item.name,
				})
			});
		})
		.catch(function (error) {
			this.$notify({
				group: 'foo',
				title: 'Error',
				text: error,
				type: 'error',
			});
		});
	}
}
</script>

<style>


</style>

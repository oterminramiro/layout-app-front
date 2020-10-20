<template>
	<div class="container">
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
export default {
	middleware: 'checkToken',
	data(){
		return {
			organizations: [],
			locations: [],
			people: 1,
			error: '',
			link_slug: ''
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
			var data = {
				location: this.link_slug,
				people: this.people,
			}
			localStorage.setItem("layout_request", JSON.stringify(data) );
			this.$router.push('/layout/'+this.link_slug)
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

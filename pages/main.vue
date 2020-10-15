<template>
	<div class="container">
		<div class="row">
			<div class="col-6 mx-auto px-0 my-5">
				<div class="text-center mx-auto">
					<img class="img-fluid w-75" src="~/assets/undraw_preferences.svg" />
					<h2 class="my-5">Select your organization:</h2>
				</div>

				<div class="text-center mx-auto">
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
			axios.get('http://localhost:8000/api/main/get_locations', {
				params: {
					guid: event
				}
			}).then(response => {
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
		axios.get('http://localhost:8000/api/main/get_organizations').then(response => {
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

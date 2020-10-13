<template>
	<div class="container">
		<div class="row">
			<div class="col-6 mx-auto px-0 my-5">
				<div class="text-center mx-auto">
					<img class="img-fluid w-75" src="~/assets/undraw_preferences.svg" />
					<h2 class="my-5">Select your organization:</h2>
				</div>

				<b-form-select class="my-3" :options="organizations" @change='getLocations($event)'></b-form-select>

				<b-form-select class="my-3" v-show="locations.length > 0" :options="locations" @change='setLocation($event)'></b-form-select>

				<nuxt-link v-show="link_slug" :to="{name: 'layout-id', params: { id:link_slug } }">
					<b-button variant="outline-dark" class="my-3" >Continuar</b-button>
				</nuxt-link>

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
			error: '',
			link_slug: false
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
		}
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

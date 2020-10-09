<template>
	<div class="container">
		<div class="row">
			<h2 class="col-12">Select your organization:</h2>
			<div class="col">
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

.container {
	margin: 0 auto;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.title {
	font-family:
	'Quicksand',
	'Source Sans Pro',
	-apple-system,
	BlinkMacSystemFont,
	'Segoe UI',
	Roboto,
	'Helvetica Neue',
	Arial,
	sans-serif;
	display: block;
	font-weight: 300;
	font-size: 100px;
	color: #35495e;
	letter-spacing: 1px;
}

</style>

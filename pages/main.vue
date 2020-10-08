<template>
	<div class="container">
		<div class="" style="border: 1px solid red" v-for='organization in organizations' :key="organization.guid">
			{{ organization.name }}
			{{ organization.guid }}
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	data(){
		return {
			organizations: []
		}
	},
	created(){
		axios.get('http://localhost:8000/api/main/get_organizations').then(response => {
			console.log(response)
			this.organizations = response.data.data
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

<template>
	<div class="container">
		<div class="row">
			<div class="col mx-auto px-0 my-5">
				<div class="text-center mx-auto">
					<img class="img-fluid w-75" src="~/assets/undraw_new_message.svg" />
					<h2 class="my-5">Bienvenido</h2>
				</div>
				<b-form @submit="onSubmit" class="w-75 mx-auto">
					<b-form-input class="text-center" v-model="code" placeholder="Enter your code" required></b-form-input>
					<b-button type="submit" class="mt-5" block variant="outline-dark">Submit</b-button>
				</b-form>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		data(){
			return {
				code: ''
			}
		},
		methods: {
			onSubmit(){

				var config = {
					method: 'post',
					url: 'http://localhost:8000/api/customers/login',
					headers: {
						'Content-Type': 'application/json'
					},
					data : JSON.stringify({
						"code":this.code,
						"id": localStorage.getItem("customer_id")
					})
				};

				event.preventDefault();
				axios(config)
				.then(response => {
					console.log(response.data)
					if(response.data.success == 'true')
					{
						localStorage.setItem("jwt_token", response.data.token );
						this.$router.push('/main')
					}
				})
				.catch(error => {
					console.log(error)
				});
			}
		}
	}
</script>

<style>
</style>

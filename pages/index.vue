<template>
	<div class="container">
		<div class="row">
			<div class="col-6 mx-auto px-0 my-5">
				<div class="text-center mx-auto">
					<img class="img-fluid w-75" src="~/assets/undraw_book.svg" />
					<h2 class="my-5">Bienvenido</h2>
				</div>
				<b-form @submit="onSubmit" class="w-75 mx-auto">
					<b-form-group id="input-group-1">
						<VuePhoneNumberInput v-model="phone" required/>
					</b-form-group>

					<b-form-group id="input-group-4" class="text-center" required>
						<b-form-checkbox size="sm" name="terms" required>Acepto los <a href="#">terminos y condiciones</a></b-form-checkbox>
					</b-form-group>

					<b-button type="submit" class="mt-5" block variant="outline-dark">Submit</b-button>
				</b-form>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import VuePhoneNumberInput from 'vue-phone-number-input';
	import 'vue-phone-number-input/dist/vue-phone-number-input.css';

	export default {
		data(){
			return {
				phone: '',
			}
		},
		methods: {
			onSubmit(){

				var config = {
					method: 'post',
					url: 'http://localhost:8000/api/customers/create',
					headers: {
						'Content-Type': 'application/json'
					},
					data : JSON.stringify({"phone":this.phone.replace(/-|\s/g, '')})
				};

				event.preventDefault();
				axios(config)
				.then(response => {
					if(response.data.success == 'true')
					{
						console.log(response.data)
						if(process.browser){
							localStorage.setItem("customer_id", response.data.id);
						}
						this.$router.push('/code')
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

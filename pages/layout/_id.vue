<template>
	<transition name="fade" v-if="loading">
		<div class="loading" >
			<img class="loading-icon" src="~/assets/loading.gif">
		</div>
	</transition>
	<div class="container" v-else>
		<notifications group="foo" position="top center" classes="vue-notification mt-3" width='90%'/>
		<div class="row">
			<div class="col mx-auto my-5">
				<div class="text-center mx-auto">
					<img class="img-fluid w-50 mb-4" src="~/assets/undraw_selected.svg" />
				</div>
				<div class="row mt-2" v-for="row in layout">
					<div class="col text-center" v-for="col in row">
						<b-button
							@click="select_layout"
							:id="col.guid"
							size="lg"
							variant="primary"
							style="width:100%; padding-bottom: 25%; padding-top: 25%;"
							:disabled="col.available == 1 ? true : false">
							{{ col.name }}
						</b-button>
					</div>
				</div>
				<div class="text-center my-4">
					<b-button
						variant="outline-dark"
						class="my-3 text-center w-50"
						@click="confirm_select">
						Confirm
					</b-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import Notifications from 'vue-notification';

	export default {
		middleware: 'checkToken',
		data(){
			return {
				layout: [],
				loading: true,
				people: null,
				date: null,
				location: null,
				customer: null,
			}
		},
		methods: {
			select_layout: function (event) {

				var options = Array.from(document.getElementsByClassName('btn-secondary'))

				if (event) {
					if(event.target.classList.contains("btn-secondary"))
					{
						event.target.classList.add("btn-primary");
						event.target.classList.remove("btn-secondary");
						event.target.classList.remove("disabled");
					}
					else
					{
						if(options.length < this.people)
						{
							event.target.classList.add("disabled");
							event.target.classList.add("btn-secondary");
							event.target.classList.remove("btn-primary");
						}
						else
						{
							this.$notify({
								group: 'foo',
								title: 'Error',
								text: 'Limite alcanzado!',
								type: 'error',
							});
						}
					}
					//console.log(event.target)
				}

				// var options = Array.from(document.getElementsByClassName('btn-secondary'))
				// console.log(options.length)
			},
			confirm_select: function(){
				var token = localStorage.getItem('jwt_token')

				var layout_array = []
				var options = Array.from(document.getElementsByClassName('btn-secondary'))
				options.forEach((item, i) => {
					layout_array.push(
						{"layoutid": item.id}
					)
				});

				var data = JSON.stringify(
					{
						"customerid": this.customer,
						"locationid": this.location,
						"people": this.people,
						"date": this.date,
						"layout": layout_array
					}
				);
				var config = {
					method: 'post',
					url: 'http://localhost:8000/api/bookings/create',
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
					data : data
				};

				axios(config)
				.then(response => {
					if(response.data.success == 'true')
					{
						this.$router.push('/success')
					}
					else
					{
						console.log(response.data)
					}
				})
				.catch(error => {
					console.log(error);
				});
			}
		},
		async mounted() {

			this.$nextTick(() => {
				this.date = JSON.parse(localStorage.getItem('layout_request')).date;
				this.people = JSON.parse(localStorage.getItem('layout_request')).people;
				this.location = JSON.parse(localStorage.getItem('layout_request')).location;
				this.customer = localStorage.getItem("customer_id");

				var data = JSON.stringify({"guid":this.location});

				var token = localStorage.getItem('jwt_token')

				var config = {
					method: 'post',
					url: 'http://localhost:8000/api/main/get_layouts',
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
					data : data
				};

				axios(config)
				.then(response => {
					this.layout = response.data.data;
					this.loading = false
				})
				.catch(error => {
					console.log(error);
				});
			})
		}
	}
</script>

<style>
	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height:700px;
	}

	.loading-icon {
		width: 100px;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}

	.col{
		padding-left: 5px;
		padding-right: 5px;
	}
</style>

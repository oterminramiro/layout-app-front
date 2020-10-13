<template>
	<transition name="fade" v-if="loading">
		<div class="loading" >
			<img class="loading-icon" src="~/assets/loading.gif">
		</div>
	</transition>
	<div class="container" v-else>
		<div class="row">
			<div class="col-6 mx-auto px-0 my-5">
				<div class="text-center mx-auto">
					<img class="img-fluid w-50 mb-4" src="~/assets/undraw_selected.svg" />
					<!-- <h2 class="my-5">Layout</h2> -->
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

	export default {
		data(){
			return {
				layout: [],
				loading: true,
			}
		},
		methods: {
			select_layout: function (event) {
				if (event) {
					// console.log(this.layout)
					event.target.classList.remove("btn-primary");
					event.target.classList.add("btn-secondary");
					event.target.classList.add("disabled");
					//console.log(event.target)
				}
			},
			confirm_select: function(){
				var options = Array.from(document.getElementsByClassName('btn-secondary'))
				options.forEach((item, i) => {
					console.log(item.id)
				});
			}
		},
		async mounted() {
			this.$nextTick(() => {
				var data = JSON.stringify({"guid":this.$route.params.id});

				var config = {
					method: 'post',
					url: 'http://localhost:8000/api/main/get_layouts',
					headers: {
						'Content-Type': 'application/json'
					},
					data : data
				};

				axios(config)
				.then(response => {
					this.layout = response.data.data;
					this.loading = false
					// console.log(response.data.data)
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

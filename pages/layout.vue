<template>
	<div class="container">
		<div class="row px-0 w-100">
			<div class="col-8 mx-auto px-0">
				<h2 class="mb-5">Layout</h2>
				<div class="row mt-2" v-for="n in 6">
					<div class="col px-0" v-for="n in 5">
						<b-button v-on:click="saludar" size="lg" variant="primary" style="width:85px; height: 85px">{{ n }}</b-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		saludar: function (event) {
			if (event) {
				event.target.classList.remove("btn-primary");
				event.target.classList.add("btn-secondary");
				event.target.classList.add("disabled");
				console.log(event.target)
			}
		}
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

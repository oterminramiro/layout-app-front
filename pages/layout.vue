<template>
  <div class="container">
    <div class="row px-0 w-100">
    	<div class="col-8 mx-auto px-0">
			<h2>Layout</h2>
			<div class="row" v-for="n in 6">
				<div class="col" v-for="n in 5" style="height:50px;border:1px solid red">
					{{ n }}
				</div>
			</div>

    	</div>
    </div>
  </div>
</template>

<script>
export default {}
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

<template>
  <div class="container">
    <div class="row px-0 w-100">
    	<div class="col-8 mx-auto px-0">
			<h2>Bienvenido</h2>
			<b-form @submit="onSubmit" @reset="onReset">
				<b-form-group
				id="input-group-1"
				>
					<b-form-input
					id="input-1"
					type="phone"
					required
					placeholder="Your phone"
					size="lg"
					></b-form-input>
				</b-form-group>

				<b-form-group id="input-group-4">
					<b-form-checkbox size="lg">Acepto los <a href="#">terminos y condiciones</a></b-form-checkbox>
				</b-form-group>

				<b-button type="submit" block variant="outline-dark">Submit</b-button>
			</b-form>
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

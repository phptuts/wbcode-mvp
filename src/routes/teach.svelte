<script>
	import { FormGroup, Input, Button } from 'sveltestrap/src';
</script>

<div class="row">
	<div class="col">
		<h1>Code: Adbs</h1>
	</div>
</div>
<div class="row">
	<div class="col">
		<h2>Link</h2>
		<FormGroup>
			<Input type="url" placeholder="Enter Link" />
		</FormGroup>
	</div>
</div>
<div class="row">
	<div class="col">
		<h2>Message</h2>
		<FormGroup>
			<Input type="textarea" rows={10} name="text" id="exampleText" />
		</FormGroup>
	</div>
</div>
<div class="row">
	<div class="col">
		<Button class="center" color="success">Submit</Button>
	</div>
</div>

<style>
	h1 {
		font-size: 100px;
	}
	h2 {
		text-align: left;
	}
</style>

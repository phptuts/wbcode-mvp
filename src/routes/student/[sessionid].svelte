<script>
	import { FormGroup, Input, Button } from 'sveltestrap/src';
</script>

<div class="row">
	<div class="col">
		<h1>Link: <a href="http://www.google.com">Google</a></h1>
	</div>
</div>
<div class="row">
	<div class="col">
		<h2>Message</h2>
		<FormGroup>
			<Input readonly type="textarea" rows={13} />
		</FormGroup>
	</div>
</div>

<style>
	h2 {
		text-align: left;
	}
</style>

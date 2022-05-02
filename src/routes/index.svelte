<script>
	import { Button, FormGroup, Label, Input } from 'sveltestrap/src';
</script>

<div class="row">
	<div class="col">
		<h1>Welcome to Whiteboard Coding</h1>
	</div>
</div>
<div class="row">
	<div class="col">
		<Button class="center" color="primary">Create Teacher Session</Button>
	</div>
</div>

<div class="row">
	<div class="col">
		<h2>Student Code</h2>
		<FormGroup>
			<Input type="text" placeholder="Enter Code" />
		</FormGroup>
		<Button class="center" color="success">Go to Session</Button>
	</div>
</div>

<script>
	import { onMount } from 'svelte';

	import { initFirebase } from '../firebase';

	onMount(() => {
		initFirebase();
	});
</script>

<div class="container">
	<slot />
	<div class="row" id="footer">
		<div class="col">
			<p>For support, ideas, or thank you please contact glaserpower [@] gmail.com</p>
			<p>Thank your trying out whiteboard coding!</p>
		</div>
	</div>
</div>

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
			<p>Thank you for trying out WB Code!</p>
		</div>
	</div>
</div>

<script>
	import { onMount } from 'svelte';

	import { initFirebase } from '../firebase';

	onMount(() => {
		initFirebase();
	});
</script>

<div class="container">
	<slot />
</div>

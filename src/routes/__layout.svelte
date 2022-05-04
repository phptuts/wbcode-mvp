<script>
	import { onMount } from 'svelte';

	import { initFirebase } from '../firebase';

	onMount(() => {
		initFirebase();
	});
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<a class="navbar-brand" href="/">
		<img
			style="margin-left: 20px; margin-right: 10px;"
			src="/favicon.png"
			width="30"
			height="30"
			alt=""
		/> WB Code
	</a>
	<button
		class="navbar-toggler"
		type="button"
		data-toggle="collapse"
		data-target="#navbarNav"
		aria-controls="navbarNav"
		aria-expanded="false"
		aria-label="Toggle navigation"
	>
		<span class="navbar-toggler-icon" />
	</button>
	<div class="collapse navbar-collapse" id="navbarNav">
		<ul class="navbar-nav">
			<li class="nav-item active">
				<a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/about">About</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/contact">Contact</a>
			</li>
		</ul>
	</div>
</nav>
<div class="container">
	<slot />
	<div class="row" id="footer">
		<div class="col">
			<p>Thank you for trying out WB Code!</p>
		</div>
	</div>
</div>

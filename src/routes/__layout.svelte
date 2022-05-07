<script>
	import { onMount } from 'svelte';
	import { getStores } from '$app/stores';

	import { initFirebase } from '../firebase';
	let isOpen = false;
	const { page } = getStores();
	function toggleMenu() {
		isOpen = !isOpen;
	}
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
		on:click={toggleMenu}
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
	<div class="navbar-collapse" class:collapse={!isOpen} id="navbarNav">
		<ul class="navbar-nav">
			<li class="nav-item">
				<a class="nav-link" class:active={$page.url.pathname == '/'} href="/"
					>Home <span class="sr-only">(current)</span></a
				>
			</li>
			<li class="nav-item">
				<a class="nav-link" class:active={$page.url.pathname == '/about'} href="/about">About</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" class:active={$page.url.pathname == '/contact'} href="/contact"
					>Contact</a
				>
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

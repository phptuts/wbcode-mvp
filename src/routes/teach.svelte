<script>
	import { initFirebase } from '../firebase';

	import { onMount } from 'svelte';

	import { collection, addDoc, updateDoc } from 'firebase/firestore';

	function makeid(length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	let newSession = {
		message: '',
		code: makeid(4),
		is_active: true,
		url: ''
	};

	let docRef;
	let db;
	let colRef;

	onMount(async () => {
		const fb = initFirebase();
		db = fb.db;
		colRef = collection(db, 'sessions');

		docRef = await addDoc(colRef, newSession);
	});

	async function submit() {
		if (!docRef) return;

		try {
			await updateDoc(docRef, newSession);
		} catch (e) {
			console.log(e);
			alert('there was an error');
		}
	}
</script>

<div class="row">
	<div class="col">
		<h1>Code: {newSession.code}</h1>
	</div>
</div>
<div class="row">
	<div class="col">
		<h2>Url</h2>
		<div class="mb-3">
			<input type="url" bind:value={newSession.url} class="form-control" />
		</div>
	</div>
</div>
<div class="row">
	<div class="col">
		<h2>Message</h2>
		<div class="mb-3">
			<textarea bind:value={newSession.message} class="form-control" rows="10" />
		</div>
	</div>
</div>
<div class="row">
	<div class="col">
		<button type="button" on:click={submit} class="btn btn-primary w-100">Submit</button>
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

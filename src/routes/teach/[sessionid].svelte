<script>
	import Student from '$lib/components/Student.svelte';

	import { initFirebase } from '../../firebase';

	import { onMount } from 'svelte';
	import { getStores } from '$app/stores';

	import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
	const { page } = getStores();
	let firebaseSessionId;

	let session = {
		message: '',
		code: '',
		is_active: true,
		url: ''
	};

	let docRef;

	onMount(async () => {
		firebaseSessionId = $page.params['sessionid'];
		const { db } = initFirebase();
		docRef = doc(db, 'sessions', firebaseSessionId);
		const sessionDoc = await getDoc(docRef);
		if (!sessionDoc.exists()) {
			alert('Invalid Session Code Please go back');
			return;
		}
		session.code = sessionDoc.data().code ?? 'Error';
	});

	async function submit() {
		if (!docRef) return;

		if (session.url) {
			try {
				const urlParse = new URL(session.url);
			} catch (e) {
				alert('Invalid url please enter https://');
				return;
			}
		} else {
			session.url = '';
		}

		try {
			await updateDoc(docRef, session);
		} catch (e) {
			console.log(e);
			alert('there was an error');
		}
	}
</script>

<svelte:head>
	<title>WB CODE - Class</title>
</svelte:head>
<div class="row">
	<div class="col">
		<h1 class="code">Code: {session.code}</h1>
	</div>
</div>
<div class="row">
	<div class="col col-md-6 col-sm-12" id="left">
		<div class="row">
			<div class="col">
				<h2>Url</h2>
				<div class="mb-3">
					<input type="url" bind:value={session.url} class="form-control" />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<h2>Message</h2>
				<div class="mb-3">
					<textarea bind:value={session.message} class="form-control" rows="10" />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<button type="button" on:click={submit} class="btn btn-primary w-100">Submit</button>
			</div>
		</div>
	</div>

	<div class="col col-6 d-none d-md-block" id="right">
		<div class="row">
			<div class="col">
				<h2>Student Preview</h2>
			</div>
		</div>
		<Student />
	</div>
</div>

<style>
	h1 {
		font-size: 100px;
		text-align: center;
	}
	h2 {
		text-align: left;
	}
	#right {
		border-left: dotted 10px gray;
	}
	@media (max-width: 700px) {
		h1 {
			font-size: 40px;
			margin-top: 10px;
		}
	}
</style>

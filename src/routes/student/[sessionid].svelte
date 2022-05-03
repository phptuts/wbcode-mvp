<script>
	import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';

	import { getStores } from '$app/stores';
	import { onMount } from 'svelte';
	import { initFirebase } from '../../firebase';

	let firebaseSessionId;
	let store = getStores();
	let sessionURL = '';
	let urlName;
	let session = {
		message: '',
		url: ''
	};

	$: if (sessionURL) {
		const urlParse = new URL(sessionURL);
		urlName = urlParse.hostname.replace('www.', '');
	} else {
		urlName = '';
	}

	store.page.subscribe((info) => {
		firebaseSessionId = info.params['sessionid'];
	});

	onMount(async () => {
		const { db } = initFirebase();
		const docRef = doc(db, 'sessions', firebaseSessionId);
		const sessionDoc = await getDoc(docRef);
		if (!sessionDoc.exists()) {
			alert('Invalid Session Code Please go back');
			return;
		}

		onSnapshot(docRef, (doc) => {
			session = doc.data();
			sessionURL = session.url;
		});
	});
</script>

<div class="row">
	<div class="col">
		<h1>Student Session</h1>
	</div>
</div>
<div class="row">
	<div class="col">
		<h1>Link: <a target="_blank" href={session.url}>{urlName}</a></h1>
	</div>
</div>
<div class="row">
	<div class="col">
		<h2>Message</h2>
		<div class="mb-3">
			<textarea class="form-control" bind:value={session.message} readonly rows="13" />
		</div>
	</div>
</div>

<style>
	h2 {
		text-align: left;
	}
</style>

<script>
	import { goto } from '$app/navigation';
	import { initFirebase } from '../firebase';

	import {
		getFirestore,
		collection,
		query,
		where,
		getDocs,
		addDoc,
		updateDoc
	} from 'firebase/firestore';

	function makeid(length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	let docRef;
	let db;
	let colRef;
	let sessionCode;

	async function goToTeachPage() {
		const { db } = initFirebase();
		const colRef = collection(db, 'sessions');
		let exists = true;

		let sessionCodeTeach;
		while (exists) {
			sessionCodeTeach = makeid(4);
			const q = query(colRef, where('code', '==', sessionCodeTeach));
			const querySnapshot = await getDocs(q);

			exists = !querySnapshot.empty;
		}

		let newSession = {
			message: '',
			code: sessionCodeTeach,
			is_active: true,
			url: ''
		};

		docRef = await addDoc(colRef, newSession);
		await goto(`teach/${docRef.id}`);
	}

	async function goToSessionPage() {
		if (!sessionCode) {
			alert('No session code');
			return;
		}
		const { db } = initFirebase();
		const colRef = collection(db, 'sessions');

		const q = query(colRef, where('code', '==', sessionCode));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			alert('Invalid session code.');
			return;
		}
		let fbSessionId;
		querySnapshot.forEach((doc) => {
			fbSessionId = doc.id;
		});
		await goto(`student/${fbSessionId}`);
	}
</script>

<svelte:head>
	<title>WB CODE - Home</title>
</svelte:head>
<div class="row">
	<div class="col">
		<h1>WB Code - Share links and messages on Chromebooks</h1>
	</div>
</div>
<div class="row">
	<div class="col">
		<button type="button" on:click={goToTeachPage} class="center w-100 btn btn-primary"
			>Create Session</button
		>
	</div>
</div>

<div class="row">
	<div class="col">
		<h2>Session Code</h2>
		<div class="mb-3">
			<input type="text" bind:value={sessionCode} placeholder="Enter Code" class="form-control" />
		</div>
		<button type="button" on:click={goToSessionPage} class="w-100 center btn btn-primary"
			>Enter Session</button
		>
	</div>
</div>

<style>
	h1 {
		margin-bottom: 30px;
		text-align: center;
	}
	h2 {
		margin-top: 50px;
	}
</style>

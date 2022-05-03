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

<div class="row">
	<div class="col">
		<h1>Welcome to Whiteboard Coding</h1>
	</div>
</div>
<div class="row">
	<div class="col">
		<button type="button" on:click={goToTeachPage} class="center btn btn-primary"
			>Create Teacher Session</button
		>
	</div>
</div>

<div class="row">
	<div class="col">
		<h2>Student Code</h2>
		<div class="mb-3">
			<input type="text" bind:value={sessionCode} placeholder="Enter Code" class="form-control" />
		</div>
		<button type="button" on:click={goToSessionPage} class=" center btn btn-primary"
			>Go to Session</button
		>
	</div>
</div>

<script>
	import { goto } from '$app/navigation';
	import { initFirebase } from '../firebase';
	import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

	let sessionCode;

	async function goToTeachPage() {
		await goto('teach');
	}

	async function goToSessionPage() {
		const { db } = initFirebase();
		const colRef = collection(db, 'sessions');

		const q = query(colRef, where('code', '==', sessionCode));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			alert('Invalid code.');
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

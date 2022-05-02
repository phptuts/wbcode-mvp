import config from './env';
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export function initFirebase() {
	if (getApps().length == 0) {
		initializeApp(config.firebase);
	}
	return { db: getFirestore() };
}

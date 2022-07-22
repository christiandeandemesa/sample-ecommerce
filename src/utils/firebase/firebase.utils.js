import {initializeApp} from 'firebase/app';

import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDpBDWWPX2MS-SmbpiTlNSNpgfJfhDcga8',
	authDomain: 'rags-to-riches-db.firebaseapp.com',
	projectId: 'rags-to-riches-db',
	storageBucket: 'rags-to-riches-db.appspot.com',
	messagingSenderId: '835504920466',
	appId: '1:835504920466:web:e3c0109decb864e007d34b'
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();

// Function that triggers a Google account popup menu to sign in.
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

// Function that creates a user document with authorization in the database.
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	if (!userAuth) return;

	// doc takes in three parameters: a database, the name of the database, and the user's unique id.
	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	// If a matching user document doesn't already exist in the database, create a document
	if (!userSnapshot.exists()) {
		const {displayName, email} = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation // Needed to avoid displayName: null in the database.
			});
		} catch (err) {
			console.log('Error creating the user', err.message);
		}
	}

	return userDocRef;
};

// Function that signs up a user.
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

// Function that signs in a user.
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

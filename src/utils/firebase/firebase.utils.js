import {initializeApp} from 'firebase/app';

import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from 'firebase/auth';

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs
} from 'firebase/firestore';

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

// Function that adds multiple documents to a collection.
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	// collectionRef is the collection with its title (i.e. collectionKey).
	const collectionRef = collection(db, collectionKey);

	const batch = writeBatch(db);

	// Adds each object as its own document to the collection.
	objectsToAdd.forEach(object => {
		const docRef = doc(collectionRef, object.title.toLowerCase());

		batch.set(docRef, object);
	});

	await batch.commit();
};

// Function that returns an array where each element is a document from the categories collection.
export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories');

	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map(docSnapShot => docSnapShot.data());
};

// Function that creates a user document with authorization in the database.
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	if (!userAuth) return;

	// userDocRef is a document in our database within the users collection.
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

// Function that signs out a user.
export const signOutUser = async () => await signOut(auth);

// Function that checks if a user is currently logged in.
export const onAuthStateChangedListener = callback => onAuthStateChanged(auth, callback);

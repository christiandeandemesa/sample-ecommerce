import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
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
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async userAuth => {
	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const {displayName, email} = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt
			});
		} catch (err) {
			console.log('Error creating the user', err.message);
		}
	}

	return userDocRef;
};

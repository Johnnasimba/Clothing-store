import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyDmDfOByXLmuVrY5rJLM2vRygtov72vSCI",
        authDomain: "e-commence-site.firebaseapp.com",
        databaseURL: "https://e-commence-site.firebaseio.com",
        projectId: "e-commence-site",
        storageBucket: "e-commence-site.appspot.com",
        messagingSenderId: "85291397130",
        appId: "1:85291397130:web:fb7a70a479bd9a3c6eaff3",
        measurementId: "G-152SSMR0WY"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return;
        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = await userRef.get()
        if (!snapShot.exists) {
                const { displayName, email } = userAuth;
                const createdAt = new Date();
                try {
                await userRef.set({
                        displayName,
                        email,
                        createdAt,
                        ...additionalData
                   })     
                } catch (error) {
                        console.log('error creating user', error.message);   
                }
        }
        return userRef;
}
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
        const collectionRef = firestore.collection(collectionKey);
        const batch = firestore.batch();
        objectToAdd.forEach(obj => {
                const newDocRef = collectionRef.doc();
                batch.set(newDocRef, obj);
        })

      return  await  batch.commit() 
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

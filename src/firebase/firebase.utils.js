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
// To be used to export data to firestore
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
        const collectionRef = firestore.collection(collectionKey);
        const batch = firestore.batch();
        objectToAdd.forEach(obj => {
                const newDocRef = collectionRef.doc();
                batch.set(newDocRef, obj);
        })

      return  await  batch.commit() 
}


export const convertCollectionsSnapshotToMap = (collections) => {
        const transformedCollections = collections.docs.map(doc => {
                const { title, items } = doc.data();
                return {
                        routeName: encodeURI(title.toLowerCase()),
                        id: doc.id,
                        title,
                        items
                }
        })
     return  transformedCollections.reduce((accumulator, collection) => {
                accumulator[collection.title.toLowerCase()] = collection; 
                return accumulator;
        } , {})
} 


export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;

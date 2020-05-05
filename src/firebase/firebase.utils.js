import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC5oq-QipMvowrbvq1Jj7ix2J8DilGeO0E",
    authDomain: "crwn-db-2c83d.firebaseapp.com",
    databaseURL: "https://crwn-db-2c83d.firebaseio.com",
    projectId: "crwn-db-2c83d",
    storageBucket: "crwn-db-2c83d.appspot.com",
    messagingSenderId: "239384375588",
    appId: "1:239384375588:web:a0d3b744866db4657d83b1",
    measurementId: "G-R0M7DME9SK"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const {displayName, email } = userAuth;
      const createdAt = new Date();

      try{
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })
      }catch(error){
          console.log('error creating user', error.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
      const {title, items } = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title, 
        items
      }
    });
    
    return transformedCollection.reduce((accumulator, collection) =>{
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    },{})
  }

  

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  
  export default firebase;

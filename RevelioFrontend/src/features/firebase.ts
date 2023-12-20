// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBipb0ly7AJzOkOExeqr8QHiBPzUcN-sVE",
  authDomain: "my-cart-f5e2b.firebaseapp.com",
  databaseURL: "https://my-cart-f5e2b-default-rtdb.firebaseio.com",
  projectId: "my-cart-f5e2b",
  storageBucket: "my-cart-f5e2b.appspot.com",
  messagingSenderId: "737096152238",
  appId: "1:737096152238:web:121e46db4bc6f93999e93f",
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
const imageStorage = getStorage(fireBaseApp);

const uploadImg = async (image: File) => {
  try {
    const uniqueName = `${Date.now()}_${image.name}`;
    const ImageStore = ref(imageStorage, uniqueName);
    const snapshot = await uploadBytes(ImageStore, image);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.log(error);
  }
};

export { uploadImg };

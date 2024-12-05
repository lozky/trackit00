import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAATWo_KReqF_O2VbQUYC3OsQRv5FlYfdM",
  authDomain: "trackit-e6948.firebaseapp.com",
  projectId: "trackit-e6948",
  storageBucket: "trackit-e6948.firebasestorage.app",
  messagingSenderId: "776244515057",
  appId: "1:776244515057:web:c48e210ef7633d83921950"
 };
  
  // Inicialización de Firebase
  const appFirebase = initializeApp(firebaseConfig);
  export const auth = getAuth(appFirebase);
  export default appFirebase;
  
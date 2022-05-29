import React, {
    createContext,
    useState,
    useEffect,
} from 'react';

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import firebaseConfig from './firebaseConfig';

const initialFirebaseState = {
    app: null,
    db: null,
};

const FirebaseContext = createContext(null)

const FirebaseContextProvider = ({ children }) => {
    const [firebase, setFirebase] = useState(initialFirebaseState);

    useEffect(() => {
        const init = () => {
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            const firebaseObj = {
                app,
                db,
                api: {
                    // Include firestore calls here
                }
            };
            setFirebase(firebaseObj);
        };

        if(!firebase.app) {
            init();
        }
    }, [
        firebase,
    ]);

    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    )
};

export { FirebaseContext }
export default FirebaseContextProvider;

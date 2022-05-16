import { useNavigate } from 'react-router-dom';
// import { db } from '../../firebase.config';
// import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useEffect } from 'react';
// css
import '../../css/startPage.css';

export const StartPage = (props) => {

    useEffect(() => {

        // https://firebase.google.com/docs/firestore/quickstart

        // const testGetData = async () => {
        //     const querySnapshot = await getDocs(collection(db, 'dictionaries'));
        //     querySnapshot.forEach((doc) => {
        //         console.log(`${doc.id} => ${doc.data()['word']} createdAt ${doc.data()['createdAt']}`);
        //     });
        // }
        // testGetData();

        // const testAddData = async () => {
        //     try {
        //         const docRef = await addDoc(collection(db, 'dictionaries'), {
        //             first: 'Ada',
        //             last: 'Lovelace',
        //             born: 1815
        //         });
        //         console.log('Document written with ID: ', docRef.id);
        //     } catch (e) {
        //         console.error('Error adding document: ', e);
        //     }
        // }
        // testAddData();
    }, []);



    // React Router V6
    let navigate = useNavigate();

    const onStartGameClick = () => {
        let path = 'play';
        navigate(path);
    }

    return (
        <div className="d-flex justify-content-center">
            <button
                type="button"
                className="start-button mt-5"
                onClick={onStartGameClick}
            >
                <b>Get Started</b>
            </button>
        </div>
    );
}
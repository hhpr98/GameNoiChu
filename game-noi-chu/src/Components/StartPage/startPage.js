import { useNavigate } from "react-router-dom";
// css
import "../../css/startPage.css";
import { db } from "../../firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const StartPage = (props) => {

    const [dictionaries, setDitionaries] = useState(null);

    useEffect(() => {
        onSnapshot(collection(db, "dictionaries"), (snapshot) => {
            setDitionaries(snapshot.docs);
        });
    }, []);

    if (dictionaries)
    {
        console.log(dictionaries.map(item => item.data()));
    }

    // React Router V6
    let navigate = useNavigate();

    const onStartGameClick = () => {
        let path = "play";
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
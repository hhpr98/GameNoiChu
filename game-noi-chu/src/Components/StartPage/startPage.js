import { useNavigate } from 'react-router-dom';
// css
import "../../css/startPage.css";

export const StartPage = (props) => {

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
import { Link } from 'react-router-dom';

export const NotFoundPage = (props) => {

    return (
        <div className="text-center text-white">
            <h3>NOT FOUND</h3>
            <h5>
                <Link to="/">Về trang chủ</Link>
            </h5>
        </div>
    )
}
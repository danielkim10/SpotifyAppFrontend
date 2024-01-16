import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/lobby");
    }

    return (
        <>
            <div className="profile-button" onClick={handleHome}>
                <b className="profile-button-items">Home</b>
            </div>
        </>
    );
}

export default HomeButton;
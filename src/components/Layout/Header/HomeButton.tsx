import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';

const HomeButton = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/lobby");
    }

    return (
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <Button label="Home" bgColorScheme="grey" handleClick={handleHome}/>
        </div>
    );
}

export default HomeButton;
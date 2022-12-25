
import { ReactComponent as HomeImage } from 'assets/images/home_image.svg';
import './styles.css';
import Login from './Login';


export const Home = () => {

    return (
        <div className="home-container">
            <Login />

            <div className="home-image">
                <HomeImage />
            </div>

        </div>
    );
};

export default Home;

import { ReactComponent as HomeImage } from 'assets/images/home_image.svg';
import './styles.css';
import Login from './Login';


export const Home = () => {

    return (
        <div className="container">
            <div className="home-container">
                <div>
                    <Login />
                </div>

                <div className="home-image">
                    <HomeImage />
                </div>

            </div>
        </div>
    );
};

export default Home;
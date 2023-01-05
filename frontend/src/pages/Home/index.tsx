
import { ReactComponent as HomeImage } from 'assets/images/home_image.svg';
import './styles.css';
import Login from './Login';


export const Home = () => {

    return (
        <>
            <div className="home-container">
                <div className="home-content-container">
                    <div>
                        <h1>Avalie Filmes</h1>
                        <p>
                            Diga o que você achou do seu filme favorito
                        </p>
                    </div>
                    <div >
                        <HomeImage />
                    </div>
                </div>
                <div className="login-container">
                    <Login />
                </div>
            </div>
        </>
    );
};

export default Home;
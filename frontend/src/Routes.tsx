import Navbar from "components/Navbar";
import MovieDetails from "pages/MovieDetails";
import Movies from "pages/Movies";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";


const Routes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route component = { Home } path="/" exact />

                <Route component = { Movies } path="/movies" exact />

                <Route component = { MovieDetails } path="/movies/:movieId" exact />
            </Switch>

        </BrowserRouter>
    );
};

export default Routes;
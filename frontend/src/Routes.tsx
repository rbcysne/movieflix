import { Route, Router, Switch } from "react-router-dom";

import Navbar from "components/Navbar";
import MovieDetails from "pages/MovieDetails";
import MovieCatalog from "pages/MovieCatalog";
import Home from "./pages/Home";
import history from "util/history";
import PrivateRoute from "components/PrivateRoute";


const Routes = () => {
    return (
        <Router history={ history }>
            <Navbar />
            <Switch>
                <Route component = { Home } path="/" exact />

                <PrivateRoute path="/movies">
                    <Route path="/movies" exact>
                        <MovieCatalog  />
                    </Route>
                
                    <Route path="/movies/:movieId">
                        <MovieDetails  />
                    </Route>
                </PrivateRoute>

            </Switch>

        </Router>
    );
};

export default Routes;
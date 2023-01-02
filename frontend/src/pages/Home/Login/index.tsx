import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";

import ButtonIcon from "components/ButtonIcon";
import { requestBackendLogin } from "util/requests";
import { saveLoginAuthData } from "util/storage";
import { LoginFormData } from "types/LoginFormData";
import { AuthContext } from "AuthContext";

import "./styles.css";
import { getTokenData } from "util/auth";


type LocationState = {
  from: string;
}

const Login = () => {

  const { authContextData, setAuthContextData } = useContext(AuthContext);
    
  const location = useLocation<LocationState>();

  const { from } = location.state || { from : {pathname: '/movies'} };

  const { register, handleSubmit, formState: { errors }, } = useForm<LoginFormData>();

  const [hasError, setHasError] = useState(false);

  const history = useHistory();

  const onSubmit = ( formData : LoginFormData ) => {
    requestBackendLogin(formData)
        .then( response => {
            setHasError(false);
            saveLoginAuthData(response.data);
            setAuthContextData({
              authenticated: true,
              tokenData: getTokenData(),
            })
            history.replace(from);
        })
        .catch( error => {
            console.log(error);
            setHasError(true);
        });
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>

        { hasError && (
            <div className="alert alert-danger">
                Credenciais inválidas!
            </div>
        )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            { ...register("username", {
                    required: "Campo obrigatório",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Valor inválido"
                    }
                })
            }
            name="username"
            type="text"
            placeholder="Email"
            className={ `form-control base-input ${ errors.username ? 'is-invalid' : ''}` }
          />
          <div className="invalid-feedback d-block">{ errors.username?.message }</div>
        </div>

        <div className="mb-2">
          <input
            { ...register("password", {
                    required: "Campo obrigatório"
                })
            }
            name="password"
            type="password"
            placeholder="Senha"
            className={ `form-control base-input ${errors.password ? 'is-invalid' : ''}` }
          />
          <div className="invalid-feedback d-block">{ errors.password?.message }</div>
        </div>

        <div className="login-submit">
          <ButtonIcon text="fazer login" />
        </div>
      </form>
    </div>
  );
};

export default Login;

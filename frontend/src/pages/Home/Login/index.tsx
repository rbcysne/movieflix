import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import ButtonIcon from "components/ButtonIcon";
import { FormData } from "types/FormData";

import "./styles.css";
import { requestBackendLogin } from "util/requests";
import { useState } from "react";
import { saveLoginAuthData } from "util/storage";


const Login = () => {
    
  const { register, handleSubmit, formState: { errors }, } = useForm<FormData>();

  const [hasError, setHasError] = useState(false);

  const history = useHistory();

  const onSubmit = ( formData : FormData ) => {
    console.log(formData);
    requestBackendLogin(formData)
        .then( response => {
            console.log(response.data);
            setHasError(false);
            saveLoginAuthData(response.data);
            history.push("/movies");
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

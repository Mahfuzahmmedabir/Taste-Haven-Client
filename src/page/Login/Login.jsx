import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from 'react-simple-captcha';

import { AuthContext } from '../../provider/AuthProvider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
const Login = () => {
  const {  loginWithEmailAndPasswrord } =
    useContext(AuthContext);
  const capcharef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  console.log(location.state);
  const [captcha, setCaptcha] = useState(true);
  const handelLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    loginWithEmailAndPasswrord(email, password)
      .then(result => {
        console.log(result.user);
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handealChack = () => {
    const captcha = capcharef.current.value;
    console.log(captcha);
    if (validateCaptcha(captcha) === true) {
      setCaptcha(false);
    } else {
      setCaptcha(true);
    }
  };
 

  return (
    <div className="py-16">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full md:w-1/3 shadow-2xl">
            <form onSubmit={handelLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="captcha"
                  onBlur={handealChack}
                  name="captcha"
                  ref={capcharef}
                  placeholder="type the captcha"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <input
                  disabled={captcha}
                  className="btn btn-primary"
                  type="submit"
                  placeholder="Submit"
                />
              </div>

              <div>
                <SocialLogin></SocialLogin>
              </div>
              <button>
                <Link to="/signup" className=" mt-4">
                  create new account
                </Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

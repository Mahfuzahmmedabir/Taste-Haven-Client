import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosOpen from '../../hooks/useAxiosOpen';

const SocialLogin = () => {
  const { loginInwithGoogle } = useAuth();
  const axiosOpen = useAxiosOpen();
  const navigate = useNavigate();
  const location = useLocation();
  const handelGoogleLogin = () => {
    loginInwithGoogle().then(result => {
      console.log(result.user);
      alert('login success');
      // navigate(from, { replace: true });
      console.log(result.user?.email);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosOpen.post('/users', userInfo).then(res => {
        console.log(res.data, 'line22');
        console.log('user log in sussfull');
      });
    });
    // .catch(error => {
    //   alert( error);
    //   // console.log('filsd')
    // });
  };
  return (
    <div>
      <div className="divider"></div>
      <div className="text-center">
        <button
          onClick={handelGoogleLogin}
          className="flex border gap-3 w-full  justify-center  p-3 rounded-full items-center"
        >
          <FcGoogle className="text-xl"></FcGoogle>
          Login With Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;

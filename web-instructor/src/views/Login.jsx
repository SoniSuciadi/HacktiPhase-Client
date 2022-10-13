import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { LOGIN } from "../config/queries";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const notify = () => toast("Wow so easy !");
  const [loginHandler, { data, loading, error }] = useMutation(LOGIN);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.login?.access_token) {
      localStorage.setItem("access_token", data.login.access_token);
      toast.success('Success Notification !', {
        position: toast.POSITION.TOP_RIGHT
    });
      navigate("/");
    }
  }, [loading, error, data])
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    loginHandler({
      variables: {
        content: user,
      },
    });
  };
  const onChangeHandler = (e) => {
    const name = e.target.name;
    setUser({
      ...user,
      [name]: e.target.value,
    });
    
  };
  
  // if (localStorage.getItem("access_token")) {
  //   <Navigate to={"/"} />;
  // }
  if (loading) return <Loading />
  if (error) return <div>{error.message}</div>;
  return (
    <section className="bg-[url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/background.jpg')] bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply bg-opacity-60">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen pt:mt-0">
        <img
          className="w-96 mb-4"
          src="https://cdn.discordapp.com/attachments/999583052097388684/1029987612754186311/hacktiphase_w.png"
          alt="logo"
        />
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 lg:space-y-8 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  value={user.email}
                  onChange={onChangeHandler}
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Email"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={user.password}
                  onChange={onChangeHandler}
                  name="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Log in to your account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

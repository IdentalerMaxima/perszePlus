import { useEffect, useState } from "react";
import LanguageSelector from "../components/LanguageSelector.jsx";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Link } from "react-router-dom";
import axiosClient from "../axios.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const { t } = useTranslation(['translation']);

  const { setCurrentUser, setUserToken } = useStateContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ __html: '' });
  const [rememberMe, setRememberMe] = useState(localStorage.getItem('token') ? true : false);
  const [registrationRestriction, setRegistrationRestriction] = useState(null);
  const [loading, setLoading] = useState();

  useEffect(() => {
    setError({ __html: '' });
  }, [i18next.language]);

  useEffect(() => {
    getRegistrationRestriction();
  }, []);

  const getRegistrationRestriction = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get('admin/registration/restricted');
      setRegistrationRestriction(response.data.restricted);
      setLoading(false);
    } catch (error) {
      console.error('Error getting registration status:', error);
    }
  };

  const translateErrors = (errorMessages) => {
    const errors = errorMessages.split('<br>');
    const translatedErrors = errors.map(errorMessage => t(errorMessage));
    setError({ __html: translatedErrors.join('<br>') });
  };

  const handleLogin = (ev) => {
    ev.preventDefault();
    setError({ __html: '' });

    axiosClient.post('/login', {
      email,
      password,
    })
      .then(({ data }) => {
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);

        } else {
          sessionStorage.setItem('user', JSON.stringify(data.user));
          sessionStorage.setItem('token', data.token);
        }

        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const finalErrors = "email or password is incorrect";
          translateErrors(finalErrors);
        }
        if (error.response) {
          console.log(error.response.data);
        }
      });
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-72 w-full">
          <CircularProgress />
        </div>
      ) : (
        <><h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {t('login')}
        </h2>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white"
              dangerouslySetInnerHTML={error}>
            </div>)}

            <form onSubmit={handleLogin} className="space-y-6" action="#" method="POST">
              <div>
                <div className="mt-14">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={t("type your email")} />
                </div>
              </div>

              <div>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={t("type your password")} />
              </div>
              <div className="flex items-center mt-2 justify-between">
                <div>
                  <input type="checkbox" id="rememberMe" name="rememberMe" checked={rememberMe} onChange={(ev) => setRememberMe(ev.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                    {t('remember me')}
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/forgotPassword" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    {t('forgot password?')}
                  </Link>
                </div>
              </div>


              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {t('login')}
                </button>
              </div>
            </form>

            {!registrationRestriction &&

              <p className="mt-10 text-center text-sm text-gray-500">
                {t('dont have an account?')}
                {' '}
                <Link
                  to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  {t('register now')}
                </Link>
              </p>}

            <LanguageSelector />
          </div></>
      )}
    </>
  )
}

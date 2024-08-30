import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../axios.js";
import LanguageSelector from "../components/LanguageSelector.jsx";
import { useTranslation } from "react-i18next";
import CustomSnackbar from "../components/popups/CustomSnackbar.jsx";

export default function Signup() {
  const { t, i18n } = useTranslation(['translation']);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState({ __html: '' });
  const [isValidToken, setIsValidToken] = useState(null);
  const [isRegistrationRestricted, setIsRegistrationRestricted] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistrationRestricted) {
      console.log('Registration restricted is set to true, performing token validation logic...')
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');

      const validateToken = async () => {
        console.log('Validating token...')
        if (token) {
          try {
            const response = await axiosClient.get(`/validateToken/${token}`);
            if (response.status === 200) {
              console.log('Token validated!')
              setEmail(response.data.email);
              setIsValidToken(true);
            } else {
              console.log('Token is invalid')
              setIsValidToken(false);
              navigate('/registration-restricted');
            }
          } catch (error) {
            console.error('Error validating token:', error);
            setIsValidToken(false);
            navigate('/registration-restricted');
          }
        } else {
          console.log('Token missing')
          setIsValidToken(false);
          navigate('/registration-restricted');
        }
      };

      validateToken();
    }
  }, [location.search, navigate]);

  const getRegistrationRestriction = async () => {
    try {
      const response = await axiosClient.get('admin/registration/restricted');
      setIsRegistrationRestricted(response.data.restricted);
    } catch (error) {
      console.error('Error getting registration status:', error);
    }
  };

  useEffect(() => {
    getRegistrationRestriction();
  }, []);

  useEffect(() => {
    if (isRegistrationRestricted) {
      navigate('/registration-restricted');
    }
  }, [isRegistrationRestricted]);

  useEffect(() => {
    setError({ __html: '' });
  }, [i18n.language]);

  const translateErrors = (errorMessages) => {
    const errors = errorMessages.split('<br>');
    const translatedErrors = errors.map(errorMessage => t(errorMessage));
    setError({ __html: translatedErrors.join('<br>') });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setError({ __html: '' });

    try {
      const response = await axiosClient.post('/signup', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: passwordConfirmation
      });

      setSnackbarMessage('Registration successful, redirecting to login page...');
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('Caught error:', error);
      if (error.response) {
        const finalErrors = Object.values(error.response.data.errors)
          .reduce((accum, next) => [...accum, ...next], [])
          .join('<br>');
        translateErrors(finalErrors);
      }
    }
  };

  // Conditional rendering based on token validity
  if (isRegistrationRestricted && isValidToken === null) {
    // Optionally, you can render a loading spinner here
    return null; // Or <LoadingSpinner />
  }

  if (isRegistrationRestricted && !isValidToken) {
    return null; // Redirect already handled in useEffect
  }

  return (
    <>
      <div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {t('register now')}
        </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error.__html && (
            <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error} />
          )}

          <form onSubmit={onSubmit} className="" action="" method="POST">
            <div className="mt-14">
              <div className="mt-14 flex justify-between py-4 space-x-4">
                <div>
                  <input
                    id="first-name"
                    name="first_name"
                    type="text"
                    value={firstName}
                    onChange={(ev) => setFirstName(ev.target.value)}
                    className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400
                      focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={t('first name')}
                  />
                </div>

                <div>
                  <input
                    id="last-name"
                    name="last_name"
                    type="text"
                    value={lastName}
                    onChange={(ev) => setLastName(ev.target.value)}
                    className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400
                      focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={t('last name')}
                  />
                </div>
              </div>

              {!isRegistrationRestricted && (
                <div className="pb-4">
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400
                  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={t('email')}
                  />
                </div>
              )}

              <div className="pb-4">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400
                      focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={t('password')}
                />
              </div>

              <div>
                <input
                  id="password-confirmation"
                  name="password_confirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(ev) => setPasswordConfirmation(ev.target.value)}
                  className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400
                      focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={t('confirm password')}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md mt-10 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t('create account')}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            {t('already have an account?')}
            {' '}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {t('login')}
            </Link>
          </p>

          <CustomSnackbar
            open={snackbarOpen}
            setOpen={setSnackbarOpen}
            message={snackbarMessage}
            severity={snackbarSeverity}
          />

          <LanguageSelector />
        </div>
      </div>
    </>
  );
}

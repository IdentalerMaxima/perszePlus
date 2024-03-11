import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios.js";
import LanguageSelector from "../components/LanguageSelector.jsx";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const { t, i18n } = useTranslation(['translation']);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState({ __html: '' });

  useEffect(() => {
    setError({ __html: '' });
  }, [i18n.language]);

  const translateErrors = (errorMessages) => {
    const errors = errorMessages.split('<br>');
    const translatedErrors = errors.map(errorMessage => t(errorMessage));
    setError({ __html: translatedErrors.join('<br>') });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: '' }); // Reset errors if there are some
    
    axiosClient.post('/signup', {
      name: fullName,
      email,
      password,
      password_confirmation: passwordConfirmation
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        if (error.response){
          const finalErrors = Object.values(error.response.data.errors)
            .reduce((accum, next) => [...accum, ...next], [])
            .join('<br>');
            translateErrors(finalErrors);
        }
      });
  };

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {t('register now')}
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white"
          dangerouslySetInnerHTML={error}>
        </div>)}

        <form onSubmit={onSubmit} className="" action="" method="POST">
          <div className="mt-14 rounded-md ring-1 ring-gray-300">
            <div>
              <input
                id="full-name"
                name="name"
                type="text"
                value={fullName}
                onChange={(ev) => setFullName(ev.target.value)}
                className="block w-full rounded-t-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400
              focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={t('full name')}
              />
            </div>

            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="block w-full border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400
              focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={t('email')}
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="block w-full border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400
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
                className="block w-full rounded-b-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400
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
        <LanguageSelector />
      </div>
    </>
  )
}

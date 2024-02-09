import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios.js";

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState({ __html: '' });


  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: '' });

    axiosClient.post('/signup', {
      name: fullName,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {

        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce((acc, next) => [...next, ...acc], []);
          console.log(finalErrors);
          setError({ __html: finalErrors.join('<br>') });
        }

      })

  }

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Regisztrálj most!
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="" action="" method="POST">

          {error.__html && (<div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
            dangerouslySetInnerHTML={error}>
          </div>)}
          
          <div>
            <div className="mt-2">
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="block w-full rounded-t-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Teljes név"
              />
            </div>
          </div>

          <div>
            <div className="">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email cím"
              />
            </div>
          </div>

          <div>
            <div className="">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Jelszó"
              />
            </div>
          </div>

          <div>
            <div className="">
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                required
                className="block w-full rounded-b-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Jelszó megerősítése"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md mt-10 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Fiók létrehozása
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Van már fiókod?{' '}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Jelentkezz be!
          </Link>

        </p>

      </div>
    </>
  )

}

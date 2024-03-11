import LanguageSelector from "../components/LanguageSelector.jsx";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation(['translation']);
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {t('login')}
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={t("type your email")}
              />
            </div>
          </div>

          <div>

          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={t("type your password")}
            />
          </div>
          <div className="flex items-center mt-2 justify-between">
            <div>
              <input type="checkbox" id="rememberMe" name="rememberMe" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                {t('remember me')}
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                {t('forgot password')}
              </a>
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

        <p className="mt-10 text-center text-sm text-gray-500">
          {t('dont have an account?')}
          {' '}
          <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            {t('register now')}
          </a>
        </p>

        <LanguageSelector />

      </div>
    </>
  )
}

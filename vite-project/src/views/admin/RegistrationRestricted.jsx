import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function RegistrationRestricted() {
  const { t } = useTranslation(['translation']);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('Registration Restricted')}
        </h1>
        <p className="mt-4 text-gray-600">
          {t('Registration is restricted to invited users only.')}
        </p>
        <p className="mt-2 text-gray-800">
          {t('If you believe this is a mistake, please contact support or check your email for an invitation.')}
        </p>
        <div className="mt-6">
          <Link
            to="/login"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
          >
            {t('Go to Login')}
          </Link>
        </div>
      </div>
    </div>
  );
}

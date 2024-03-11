import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const LanguageSelector = () => {
    const { i18n } = useTranslation(['translation']);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('selectedLanguage');
        if (storedLanguage && i18n.language !== storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);



    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        localStorage.setItem('selectedLanguage', code);
    };

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' }, 
        { code: 'es', name : 'Español'},
        { code: 'hu', name: 'Magyar' }

    ];

    return (
        <div className="flex justify-center space-x-4 mt-5">
            {languages.map((lng) => (
                <button
                    key={lng.code}
                    onClick={() => changeLanguage(lng.code)}
                    className="text-blue-500 px-4 py-2 rounded hover:text-blue-900"
                >
                    {lng.name}
                </button>
            ))}
        </div>
    );
};

export default LanguageSelector;

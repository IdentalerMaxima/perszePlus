import axiosClient from '../../axios';
import { useEffect, useState,} from 'react';
import Cancel from '../popups/Cancel';
import { useStateContext } from '../../contexts/ContextProvider';

export default function PersonalData() {
  const { currentUser, setCurrentUser } = useStateContext();
  const initialFormData =
  {
    neptun_code: currentUser.neptun_code ? currentUser.neptun_code : '',
    university: currentUser.university ? currentUser.university : '',
    faculty: currentUser.faculty ? currentUser.faculty : '',
    start_year: currentUser.start_year ? currentUser.start_year : '',
    current_semester: currentUser.current_semester ? currentUser.current_semester : '',
    educational_format: currentUser.educational_format ? currentUser.educational_format : '',
    level_of_education: currentUser.level_of_education ? currentUser.level_of_education : '',
  }
  const [formData, setFormData] = useState(initialFormData);
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [universitiesLoading, setUniversitiesLoading] = useState(true);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCancelClicked, setIsCancelClicked] = useState(false);
  const [rerender, setRerender] = useState(false);

  // Fetch universities on mount
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axiosClient.get('/universities');
        setUniversities(response.data);
        setUniversitiesLoading(false);
      } catch (error) {
        setUniversitiesLoading(false);
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  //Set selected university if user has one and fetch faculties
  useEffect(() => {
    if (!universitiesLoading && formData.university) {
      const selectedUniv = universities.find(university => university.name === formData.university);
      if (selectedUniv) {
        setSelectedUniversity(selectedUniv);
        fetchFaculties(selectedUniv.id);
      }
    }
  }, [universitiesLoading, universities, formData.university]);


  const fetchFaculties = async (universityId) => {
    try {
      const response = await axiosClient.get(`/universities/${universityId}/faculties`);
      setFaculties(response.data);
    } catch (error) {
      console.error('Error fetching faculties: ', error);
    }
  }

  const handleUniversityChange = (event) => {
    const universityId = parseInt(event.target.value);
    const newSelectedUniversity = universities.find(university => university.id === universityId);
    if (newSelectedUniversity) {
      setSelectedUniversity(newSelectedUniversity);
      setFormData({
        ...formData,
        university: newSelectedUniversity.name,
        faculty: '',
      });
      fetchFaculties(newSelectedUniversity.id);
    } else {
      console.log('No university selected');
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      console.log('Data to save:', formData);
      const response = await axiosClient.post('/user/info', formData);
      setLoading(false);

      //retrieve new currentUser data
      const newUserData = await axiosClient.get('/user/info');
      setCurrentUser(newUserData.data.user);

    } catch (error) {
      setError('An error occurred while saving data.');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
    openCancelDialog();
  };

  const openCancelDialog = () => {
    setIsCancelClicked(true);
  };

  const resetFormFields = () => {
    setFormData(initialFormData);
    setRerender(prev => !prev);
  }


  return (
    <form key={rerender}>
      <div className="space-y-12">
        <div className="pb-24">
          <h2 className="text-base font-semibold leading-7 text-gray-900">University data</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Neptun code
              </label>
              <div className="mt-2">
                <input
                  name="neptun_code"
                  id="neptun-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={formData.neptun_code}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                University
              </label>
              <div className="mt-2">
                <select
                  id="university-name"
                  name="university"
                  onChange={handleUniversityChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={selectedUniversity ? selectedUniversity.id : ''}
                  //handleChange={handleChange}

                >
                  {!selectedUniversity && <option value="">Select a university</option>}
                  {Array.isArray(universities) && universities.map((university) => (
                    <option key={university.id} value={university.id}>
                      {university.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="faculty" className="block text-sm font-medium leading-6 text-gray-900">
                Faculties
              </label>
              <div className="mt-2">
                <select
                  id="faculty-name"
                  name="faculty"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={formData.faculty}
                  onChange={handleChange}
                  disabled={!formData.university}
                >

                  {!formData.university && (
                    <option value="" disabled>Select a university first!</option>
                  )}

                  {!formData.faculty && (
                    <option value="" >Select a faculty</option>
                  )}

                  {Array.isArray(faculties) && faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty}
                    </option>
                  ))}

                </select>
              </div>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Start year
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="start_year"
                  id="start-year"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={formData.start_year}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Current semester
              </label>
              <div className="mt-2">
                <input
                  name="current_semester"
                  id="current-semester"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.current_semester}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="faculty" className="block text-sm font-medium leading-6 text-gray-900">
                Educational format
              </label>
              <div className="mt-2">
                <select
                  id="educational-format"
                  name="educational_format"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={formData.educational_format}

                  onChange={handleChange}
                >

                  {!formData.educational_format && (
                    <option value="">Select an educational format</option>
                  )}
                  {['Full-time', 'Part-time', 'Distance learning'].map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}

                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="faculty" className="block text-sm font-medium leading-6 text-gray-900">
                Level of education
              </label>
              <div className="mt-2">
                <select
                  id="level-of-education"
                  name="level_of_education"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={formData.level_of_education}
                  onChange={handleChange}
                >

                  {!formData.level_of_education && (
                    <option value="">Select a level of education</option>
                  )}
                  {['BSc', 'BA', 'PhD', 'MSc', 'MA', 'Other'].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}

                </select>
              </div>
            </div>

          </div>
        </div>

        <div className="flex justify-end gap-x-6 pt-4 border-t border-gray-90 mt-96">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>

      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {isCancelClicked && (
        <Cancel
          handleClose={() => setIsCancelClicked(false)}
          resetForm={resetFormFields}
        />
      )}

    </form>
  )
}

import axiosClient from '../../axios';
import { useEffect, useState } from 'react';

export default function PersonalData() {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    // Fetch universities from the database
    const fetchUniversities = async () => {
      try {
        const response = await axiosClient.get('/universities');
        setUniversities(response.data);
        //console.log('Universities:', data);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  const fetchFaculties = async (universityId) => {
    try {
      const response = await axiosClient.get(`/universities/${universityId}/faculties`);
      setFaculties(response.data);
      //console.log('Faculties:', response.data);
    } catch (error) {
      console.error('Error fetching faculties:', error);
    }
  }

  const handleUniversityChange = (event) => {
    const universityId = event.target.value;
    setSelectedUniversity(universityId);
    fetchFaculties(universityId);
  };


  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">University data</h2>
          {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Neptun code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                University
              </label>
              <div className="mt-2">
                <select
                  id="university"
                  name="university"
                  autoComplete="country-name"
                  onChange={handleUniversityChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {/* <option>Pécsi Tudományegyetem</option>
                  <option>Budapesti Corvinus Egyetem</option>
                  <option>Budapesti Gazdasági Egyetem</option>
                  <option>Debreceni Egyetem</option>
                  <option>Eötvös Loránd Tudományegyetem</option>
                  <option>Kaposvári Egyetem</option> */}

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
                  id="faculty"
                  name="faculty"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {/* <option>Pécsi Tudományegyetem</option>
                  <option>Budapesti Corvinus Egyetem</option>
                  <option>Budapesti Gazdasági Egyetem</option>
                  <option>Debreceni Egyetem</option>
                  <option>Eötvös Loránd Tudományegyetem</option>
                  <option>Kaposvári Egyetem</option> */}

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
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Current semester
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="faculty" className="block text-sm font-medium leading-6 text-gray-900">
                Educational format
              </label>
              <div className="mt-2">
                <select
                  id="faculty"
                  name="faculty"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Full-time education</option>
                  <option>Evening education</option>
                  <option> Correspondence learning</option>

                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="faculty" className="block text-sm font-medium leading-6 text-gray-900">
                Level of education
              </label>
              <div className="mt-2">
                <select
                  id="faculty"
                  name="faculty"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>BSc</option>
                  <option>BA</option>
                  <option>PhD</option>
                  <option>MSc</option>
                  <option>MA</option>
                  <option>Other</option>

                </select>
              </div>
            </div>

          </div>



          

        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
      </div>

    </form>
  )
}

import React from 'react';
import { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axiosClient from '../../axios';
import Cancel from '../popups/Cancel';
import { use } from 'i18next';
import dayjs from 'dayjs';




export default function PersonalData({ currentUser }) {

  const [isChecked, setIsChecked] = useState(currentUser.temp_addr == 'true' ? true : false);
  const [isCancelClicked, setIsCancelClicked] = useState(false);
  const [rerender, setRerender] = useState(false);

  const initialFormData = {
    first_name: currentUser ? currentUser.first_name : '',
    last_name: currentUser ? currentUser.last_name : '',
    email: currentUser ? currentUser.email : '',
    phone_number: currentUser.phone_number ? currentUser.phone_number : '',
    birth_date: currentUser.birth_date ? currentUser.birth_date : null,
    birth_place: currentUser.birth_place ? currentUser.birth_place : '',
    mothers_name: currentUser.mothers_name ? currentUser.mothers_name : '',
    street_address: currentUser.street_address ? currentUser.street_address : '',
    city: currentUser.city ? currentUser.city : '',
    state: currentUser.state ? currentUser.state : '',
    zip: currentUser.zip ? currentUser.zip : '',
    temp_addr: currentUser.temp_addr ? currentUser.temp_addr : 'false',
    temp_addr_street: currentUser.temp_addr_street ? currentUser.temp_addr_street : '',
    temp_addr_city: currentUser.temp_addr_city ? currentUser.temp_addr_city : '',
    temp_addr_state: currentUser.temp_addr_state ? currentUser.temp_addr_state : '',
    temp_addr_zip: currentUser.temp_addr_zip ? currentUser.temp_addr_zip : '',
  };


  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'temp_addr') {
      setIsChecked(!isChecked);
      setFormData({
        ...formData,
        [name]: !isChecked ? 'true' : 'false',
        temp_addr_street: !isChecked ? '' : formData.temp_addr_street,
        temp_addr_city: !isChecked ? '' : formData.temp_addr_city,
        temp_addr_state: !isChecked ? '' : formData.temp_addr_state,
        temp_addr_zip: !isChecked ? '' : formData.temp_addr_zip,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      birth_date: date.format('YYYY-MM-DD'),
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      console.log('Data to save:', formData);
      const response = await axiosClient.post('/user/info', formData);
      console.log('Data saved successfully:', response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error saving data:', error);
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
        <div className="border-b border-gray-900/10 pb-12">

          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
            {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
          </div>


          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first_name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                   ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last_name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                   ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                   ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone_number"
                  type="tel"
                  autoComplete="phone"
                  placeholder='+36 30 123 4567'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                   ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2 ">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Birth date
              </label>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      name="birth_date"
                      id="birth-date"
                      value={dayjs(formData.birth_date)}
                      onChange={ (date) => handleDateChange(date)}
                      renderInput={(params) => <input {...params} />}
                      sx={{
                        '& .MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputAdornedEnd.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input:focus': {
                          boxShadow: 'none !important',
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>


            <div className="sm:col-span-2">
              <label htmlFor="birth-place" className="block text-sm font-medium leading-6 text-gray-900">
                Birth place
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="birth_place"
                  id="birth-place"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.birth_place}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="mothers-nameS" className="block text-sm font-medium leading-6 text-gray-900">
                Mothers name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="mothers_name"
                  id="mother-name"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.mothers_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street_address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.street_address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="state"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="zip"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-span-full">
              <div className="flex h-6 items-center">
                <input
                  id="homeAddressIsDifferent"
                  name="temp_addr"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked={isChecked}
                  onChange={() => {
                    setIsChecked(!isChecked);
                    setFormData({
                      ...formData,
                      temp_addr: !isChecked ? 'true' : 'false',
                      temp_addr_street: !isChecked ? '' : formData.temp_addr_street,
                      temp_addr_city: !isChecked ? '' : formData.temp_addr_city,
                      temp_addr_state: !isChecked ? '' : formData.temp_addr_state,
                      temp_addr_zip: !isChecked ? '' : formData.temp_addr_zip,
                    });
                  }}
                />
                <p className="text-gray-500 ml-2"> I have a different temporary address than home address.</p>
              </div>
            </div>


            <div className="col-span-full" style={{ display: isChecked ? 'block' : 'none' }}>
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="temp_addr_street"
                  id="temporary-street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  value={formData.temp_addr_street}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1" style={{ display: isChecked ? 'block' : 'none' }}>
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="temp_addr_city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.temp_addr_city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2" style={{ display: isChecked ? 'block' : 'none' }}>
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="temp_addr_state"
                  id="temporary-state"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.temp_addr_state}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2" style={{ display: isChecked ? 'block' : 'none' }}>
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="temp_addr_zip"
                  id="zip"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.temp_addr_zip}
                  onChange={handleChange}
                />
              </div>
            </div>


          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">

        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSubmit}
        >
          Save
        </button>

      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {isCancelClicked && (
        <Cancel
          handleClose={() => setIsCancelClicked(false)}
          resetForm={resetFormFields}
        />
      )}

    </form >

  )
}


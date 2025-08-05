import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchCountries } from '../../utils/api'
import { phoneSchema } from '../../utils/validation'
import Button from '../UI/Button'
import Input from '../UI/Input'
import LoadingSpinner from '../UI/LoadingSpinner'

const PhoneForm = ({ onSubmit, loading = false }) => {
  const [countries, setCountries] = useState([])
  const [loadingCountries, setLoadingCountries] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger
  } = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryCode: '+91', // Default to India
      phoneNumber: ''
    }
  })

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countriesData = await fetchCountries()
        setCountries(countriesData)
      } catch (error) {
        console.error('Error loading countries:', error)
      } finally {
        setLoadingCountries(false)
      }
    }
    loadCountries()
  }, [])

  const handleFormSubmit = (data) => {
    // Clean the phone number by removing spaces and special characters
    const cleanPhoneNumber = data.phoneNumber.replace(/\s+/g, '').replace(/[^\d]/g, '')
    const fullPhoneNumber = data.countryCode + cleanPhoneNumber
    onSubmit(fullPhoneNumber)
  }

  // Handle phone number input changes
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value
    // Only allow digits and spaces
    const cleanedValue = value.replace(/[^\d\s]/g, '')
    setValue('phoneNumber', cleanedValue)
    // Trigger validation after a short delay
    setTimeout(() => trigger('phoneNumber'), 100)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Country Code
          </label>
          {loadingCountries ? (
            <div className="flex items-center justify-center h-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <LoadingSpinner size="sm" />
            </div>
          ) : (
            <select
              {...register('countryCode')}
              className="input-field"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
          )}
          {errors.countryCode && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.countryCode.message}
            </p>
          )}
        </div>
        
        <div className="col-span-2">
          <Input
            label="Phone Number"
            placeholder="e.g., 7000025951"
            {...register('phoneNumber')}
            onChange={handlePhoneNumberChange}
            error={errors.phoneNumber?.message}
          />
        </div>
      </div>

      <Button
        type="submit"
        loading={loading}
        disabled={loadingCountries}
        className="w-full"
      >
        Send OTP
      </Button>
      
      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Enter your phone number without country code (e.g., 7000025951)
        </p>
      </div>
    </form>
  )
}

export default PhoneForm 
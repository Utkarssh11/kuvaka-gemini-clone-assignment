import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { otpSchema } from '../../utils/validation'
import Button from '../UI/Button'
import Input from '../UI/Input'

const OTPForm = ({ onSubmit, loading = false, phoneNumber, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ''
    }
  })

  const handleFormSubmit = (data) => {
    
    const cleanOTP = data.otp.replace(/\s+/g, '').replace(/[^\d]/g, '')
    onSubmit(cleanOTP)
  }

 
  const handleOTPChange = (e) => {
    const value = e.target.value
    
    const cleanedValue = value.replace(/[^\d\s]/g, '')
    setValue('otp', cleanedValue)
    
    setTimeout(() => trigger('otp'), 100)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          We've sent a 6-digit code to
        </p>
        <p className="font-medium text-gray-900 dark:text-white">
          {phoneNumber}
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Enter OTP"
          placeholder="123456"
          maxLength={6}
          {...register('otp')}
          onChange={handleOTPChange}
          error={errors.otp?.message}
        />

        <div className="flex space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Back
          </Button>
          
          <Button
            type="submit"
            loading={loading}
            className="flex-1"
          >
            Verify OTP
          </Button>
        </div>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Didn't receive the code? 
          <button 
            type="button"
            className="text-primary-600 hover:text-primary-700 ml-1"
            onClick={onBack}
          >
            Resend
          </button>
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Enter any 6-digit number for demo (e.g., 123456)
        </p>
      </div>
    </div>
  )
}

export default OTPForm 

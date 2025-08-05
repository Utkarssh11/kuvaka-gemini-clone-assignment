import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { sendOTP, verifyOTP } from '../utils/api'
import { useAuthStore } from '../store/authStore'
import { useUIStore } from '../store/uiStore'
import PhoneForm from '../components/Forms/PhoneForm'
import OTPForm from '../components/Forms/OTPForm'
import DarkModeToggle from '../components/UI/DarkModeToggle'

const Login = () => {
  const [step, setStep] = useState('phone') // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { initializeDarkMode } = useUIStore()

  useEffect(() => {
    initializeDarkMode()
  }, [initializeDarkMode])

  const handlePhoneSubmit = async (phone) => {
    setLoading(true)
    try {
      await sendOTP(phone)
      setPhoneNumber(phone)
      setStep('otp')
      toast.success('OTP sent successfully!')
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleOTPSubmit = async (otp) => {
    setLoading(true)
    try {
      const result = await verifyOTP(phoneNumber, otp)
      login(result.user)
      toast.success('Login successful!')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setStep('phone')
    setPhoneNumber('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
      
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome to Gemini Clone
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to start chatting with AI
          </p>
        </div>

        <div className="card p-8">
          {step === 'phone' ? (
            <PhoneForm onSubmit={handlePhoneSubmit} loading={loading} />
          ) : (
            <OTPForm 
              onSubmit={handleOTPSubmit} 
              loading={loading} 
              phoneNumber={phoneNumber}
              onBack={handleBack}
            />
          )}
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            This is a demo app. Any 6-digit OTP will work for testing.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login 
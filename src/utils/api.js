// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Fetch countries for phone codes
export const fetchCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const countries = await response.json()
    return countries
      .filter(country => country.idd?.root)
      .map(country => ({
        name: country.name.common,
        code: country.idd.root + (country.idd.suffixes?.[0] || ''),
        flag: country.flags.svg
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error('Error fetching countries:', error)
    // Fallback data
    return [
      { name: 'United States', code: '+1', flag: '🇺🇸' },
      { name: 'India', code: '+91', flag: '🇮🇳' },
      { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
      { name: 'Canada', code: '+1', flag: '🇨🇦' },
      { name: 'Australia', code: '+61', flag: '🇦🇺' }
    ]
  }
}

// Simulate OTP sending
export const sendOTP = async (phoneNumber) => {
  await delay(1500) // Simulate network delay
  return { success: true, message: 'OTP sent successfully' }
}

// Simulate OTP verification
export const verifyOTP = async (phoneNumber, otp) => {
  await delay(1000) // Simulate network delay
  
  // Simulate OTP validation (any 6-digit number works in demo)
  if (otp.length === 6 && /^\d{6}$/.test(otp)) {
    return {
      success: true,
      user: {
        id: Date.now().toString(),
        phoneNumber,
        name: `User ${phoneNumber.slice(-4)}`,
        createdAt: new Date().toISOString()
      }
    }
  } else {
    throw new Error('Invalid OTP')
  }
}

// Simulate AI response
export const getAIResponse = async (message, chatId) => {
  await delay(2000 + Math.random() * 3000) // Random delay between 2-5 seconds
  
  const responses = [
    "That's an interesting question! Let me think about that...",
    "I understand what you're asking. Here's what I can tell you...",
    "Great question! Based on my knowledge, I would say...",
    "I'm processing your request. Here's my response...",
    "That's a complex topic. Let me break it down for you...",
    "I appreciate you asking that. Here's my perspective...",
    "That's a good point. Let me elaborate on that...",
    "I see what you mean. Here's what I think about that...",
    "Interesting perspective! Here's my take on it...",
    "That's a thoughtful question. Let me address that..."
  ]
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)]
  
  return {
    id: Date.now().toString(),
    content: randomResponse,
    sender: 'ai',
    timestamp: new Date().toISOString()
  }
}

// Simulate image upload
export const uploadImage = async (file) => {
  await delay(1000) // Simulate upload delay
  
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve({
        url: e.target.result,
        name: file.name,
        size: file.size,
        type: file.type
      })
    }
    reader.readAsDataURL(file)
  })
} 
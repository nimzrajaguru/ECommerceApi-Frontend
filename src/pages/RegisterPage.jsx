import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/authService.js'
import { useAuth } from '../context/AuthContext.jsx'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')

  const { login: loginToContext } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      const data = await register(email, password, firstName, lastName)
      loginToContext(data.token, { email: data.email, firstName: data.firstName })
      navigate('/')
    } catch (err) {
      setError('Registration failed. Email may already be in use.')
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage

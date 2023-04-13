import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

  const response = await fetch('http://localhost:8080/users/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  if (response.ok) {
    // User registered successfully
    alert('Registration successful! Please log in to continue.')
    window.location.href = '/login' // Redirect to login page
  } else {
    // Handle error response
  }
  }

  return (
    <>
      <Head>
        <title>Sign Up - Pocket</title>
      </Head>
      <AuthLayout
        title="Sign up for an account"
        subtitle={
          <>
            Already registered?{' '}
            <Link href="/login" className="text-cyan-600">
              Sign in
            </Link>{' '}
            to your account.
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <TextField
              label="First name"
              id="name"
              name="name"
              type="text"
              autoComplete="given-name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              label="Last name"
              id="lastname"
              name="lastname"
              type="text"
              autoComplete="family-name"
              required
              value={formData.lastname}
              onChange={handleInputChange}
            />
            <TextField
              className="col-span-full"
              label="Username"
              id="username"
              name="username"
              type="text"
              autoComplete="family-name"
              required
              value={formData.username}
              onChange={handleInputChange}
            />
            <TextField
              className="col-span-full"
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              className="col-span-full"
              label="Password"
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit" color="cyan" className="mt-8 w-full">
            Get started today
          </Button>
        </form>
      </AuthLayout>
    </>
  )
}

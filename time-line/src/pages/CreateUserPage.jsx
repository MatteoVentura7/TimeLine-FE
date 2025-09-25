import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateUserPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const [passwordValidationMessage, setPasswordValidationMessage] = useState(''); 
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    
    if (newPassword.length < 8) {
      setPasswordValidationMessage('La password deve contenere almeno 8 caratteri.');
    } else if (!/[A-Z]/.test(newPassword)) {
      setPasswordValidationMessage('La password deve contenere almeno una lettera maiuscola.');
    } else if (!/[0-9]/.test(newPassword)) {
      setPasswordValidationMessage('La password deve contenere almeno un numero.');
    } else {
      setPasswordValidationMessage(''); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const userData = { email, password };
      const response = await axios.post('http://localhost:3000/users', userData);
      console.log('User created successfully:', response.data);
      setSuccessMessage('User created successfully! Redirecting to login page...'); 
      setErrorMessage(''); 
      setTimeout(() => navigate('/'), 3000); 
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'Email già esistente') {
        setErrorMessage('L\'email fornita è già registrata. Prova con un\'altra o accedi.');
      } else {
        console.error('Error creating user:', error);
        setErrorMessage('Errore durante la creazione dell\'utente. Riprova più tardi.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      {successMessage && (
        <div className="mb-4 p-4 text-green-800 bg-green-200 rounded-md">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-4 text-red-800 bg-red-200 rounded-md">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {passwordValidationMessage && (
            <p className="text-red-600 text-sm mt-1">{passwordValidationMessage}</p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
import { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function useRegister() {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'La password deve contenere almeno 8 caratteri.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'La password deve contenere almeno una lettera maiuscola.';
    }
    if (!/[0-9]/.test(password)) {
      return 'La password deve contenere almeno un numero.';
    }
    return '';
  };

  const handlePasswordChange = (password) => {
    const validationMessage = validatePassword(password);
    setPasswordValidationMessage(validationMessage);
    passwordRef.current = password;
  };

  const register = () => {
    const email = emailRef.current;
    const password = passwordRef.current;
    const confirmPassword = confirmPasswordRef.current;

    const validationMessage = validatePassword(password);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Le password non corrispondono.');
      return;
    }

    axios.post('http://localhost:3000/users', { email, password })
      .then((response) => {
        console.log('User created successfully:', response.data);
        setSuccessMessage('Register successfully! Redirecting to login page...');
        setErrorMessage('');
        setTimeout(() => navigate('/'), 3000);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400 && error.response.data.error === 'Email già esistente') {
          setErrorMessage('L\'email fornita è già registrata.');
        } else {
          console.error('Error creating user:', error);
          setErrorMessage('Errore durante la registrazione. Riprova più tardi.');
        }
      });
  };

  return {
    emailRef,
    passwordRef,
    confirmPasswordRef,
    successMessage,
    errorMessage,
    passwordValidationMessage,
    handlePasswordChange,
    register,
  };
}
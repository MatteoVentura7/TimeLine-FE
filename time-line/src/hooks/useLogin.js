import { useRef } from 'react';
import axios from 'axios';

export default function useLogin() {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const loginResultRef = useRef(null);

  const login = () => {
    axios
      .post('http://localhost:3000/users/login', {
        email: emailRef.current,
        password: passwordRef.current,
      })
      .then((response) => {
        loginResultRef.current = response.data.message;
        alert('Login effettuato con successo!');
      })
      .catch((error) => {
        if (error.response) {
          loginResultRef.current = error.response.data.error;
          alert('Errore: ' + error.response.data.error);
        } else {
          console.error('Errore di rete:', error);
          alert('Errore di rete. Riprova più tardi.');
        }
      });
  };

  return { emailRef, passwordRef, loginResultRef, login };
}
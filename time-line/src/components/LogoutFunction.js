
export function LogoutFunction() {
  localStorage.removeItem('token');
  alert('Logout effettuato');
}
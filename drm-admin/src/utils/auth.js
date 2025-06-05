// src/utils/auth.js
import Cookies from 'vue-cookies'

export function isAuthenticated() {
  return !!Cookies.get('userName');
}

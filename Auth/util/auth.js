const API_KEY = "AIzaSyAkDudo_8yZLzfPI-QhwDnq74LPhA78Wm8";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ email, password, returnSecureTokenField: true }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data);
  }

  return data.idToken;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

export const localToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxODI2NzMzLCJpYXQiOjE2NzQwNTA3MzMsImp0aSI6IjQ2YjhjZTY3N2QyYzQyZDE4MGQ5ZTEzMTNjODA3NmJlIiwidXNlcl9pZCI6MX0._7VblQ8skjD6qnnm9ITqGXup7drRRSf2kxq2ZKDPElU";
const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
export const token = lsUser?.token?.access;

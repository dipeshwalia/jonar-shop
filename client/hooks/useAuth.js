import { useMutation } from "react-query";
import jwt_decode from "jwt-decode";

const getAuthToken = ({ username, password }) => {
  return fetch("http://localhost:3000/api/auth", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((response) => response.json());
};

const signUp = ({ username, password, email }) => {
  return fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      email,
      address: "hardcoded for now",
    }),
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("HTTP status " + resp.status);
      }
      return resp.json();
    })
};

export const useLogin = () => {
  return useMutation(getAuthToken);
};

export const useSignUp = () => {
  return useMutation(signUp);
};

export const useUser = () => {
  const userToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  if (userToken) return { user: jwt_decode(userToken), token: userToken };
  return {};
};

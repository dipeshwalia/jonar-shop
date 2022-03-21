import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import { useLogin, useSignUp } from "../hooks/useAuth";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import DialogView from "./Dialog";
import { Typography } from "@mui/material";

const SignUp = () => {
  const [signUp, setSignup] = React.useState({
    username: "",
    password: "",
    email: "",
  });
  const { mutate: signFn, data, isLoading, isError } = useSignUp();

  return (
    <>
      {data?.success && data?.success === true ? (
        <Alert severity="success">Account Created. Please login</Alert>
      ) : (
        <>
          <Typography variant="h6" mt="2">
            Sign Up
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            {isError ? (
              <Alert severity="error">Error creating account</Alert>
            ) : null}

            <Input
              type="text"
              inputProps={{ "aria-label": "username" }}
              value={signUp.username}
              onChange={({ target }) => {
                setSignup({ ...signUp, username: target.value });
              }}
            />
            <Input
              placeholder="password"
              type="password"
              inputProps={{ "aria-label": "password" }}
              value={signUp.password}
              onChange={({ target }) => {
                setSignup({ ...signUp, password: target.value });
              }}
            />
            <Input
              placeholder="email"
              type="email"
              inputProps={{ "aria-label": "email" }}
              value={signUp.email}
              onChange={({ target }) => {
                setSignup({ ...signUp, email: target.value });
              }}
            />
            <LoadingButton
              loading={isLoading}
              disabled={!signUp.password || !signUp.username || !signUp.email}
              variant="outlined"
              onClick={() => signFn(signUp)}
            >
              Sign Up
            </LoadingButton>
          </Box>
        </>
      )}
    </>
  );
};

export default function Login({ onClose }) {
  const [login, setLogin] = React.useState({
    username: "",
    password: "",
  });
  const { mutate: loginFn, status, isSuccess, isLoading, data } = useLogin();

  React.useEffect(() => {
    if (data?.accessToken) {
      typeof window !== "undefined" &&
        localStorage.setItem("accessToken", data.accessToken);
      onClose();
    }
  }, [data]);

  return (
    <DialogView onClose={onClose} title="Sign In">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        {isSuccess && status !== 200 ? (
          <Alert severity="error">
            Invalid Credentials / Or Account Not found
          </Alert>
        ) : null}
        <Input
          type="text"
          inputProps={{ "aria-label": "username" }}
          value={login.username}
          onChange={({ target }) => {
            setLogin({ ...login, username: target.value });
          }}
        />
        <Input
          placeholder="password"
          type="password"
          inputProps={{ "aria-label": "password" }}
          value={login.password}
          onChange={({ target }) => {
            setLogin({ ...login, password: target.value });
          }}
        />
        <LoadingButton
          loading={isLoading}
          disabled={!login.password || !login.username}
          variant="outlined"
          onClick={() => loginFn(login)}
        >
          Login
        </LoadingButton>
      </Box>
      <SignUp onClose={onClose} />
    </DialogView>
  );
}

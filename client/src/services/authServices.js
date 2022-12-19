import axios from "axios";

const createNewAccount = async (createAccountForm) => {
  const userData = {
    email: createAccountForm.email,
    username: createAccountForm.username,
    password: createAccountForm.password,
  };
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.post(
    "http://localhost:5000/api/auth/createaccount",
    userData,
    config
  );

  return data;
};

const loginUser = async (loginForm) => {
  const userData = {
    username: loginForm.username,
    password: loginForm.password,
  };
  console.log(userData);
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  console.log(config);

  const { data } = await axios.post(
    "http://localhost:5000/api/auth/login",
    userData,
    config
  );
  console.log(data);
  console.log(data.token);
  console.log(data.id);

  return data;
};

export { createNewAccount, loginUser };

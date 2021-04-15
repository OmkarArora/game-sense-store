// Database
const Users = [
  {
    username: "admin@gmail.com",
    password: "admin",
  },
  {
    username: "user@gmail.com",
    password: "user",
  },
];

const findUserByUserName = (username) => {
  return Users.find((user) => user.username === username);
};

export const fakeAuthApi = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = findUserByUserName(username);
      if (user) {
        if (user.password === password) {
          resolve({ success: true, status: 200 });
        } else {
          return reject({
            success: false,
            status: 401,
            errorMessage: "Incorrect password",
          });
        }
      } else {
        return reject({
          success: false,
          status: 401,
          errorMessage: "User not found",
        });
      }
      reject({ success: false, status: 401 });
    }, 3000);
  });
};

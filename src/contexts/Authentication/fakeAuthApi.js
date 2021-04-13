// Database
const Users = [
	{
	  username: "admin",
	  password: "admin"
	},
	{
	  username: "user",
	  password: "user"
	},
  ];
  
  const findUserByUserName = (username) => {
	return Users.find((user) => user.username === username);
  };
  
  export const fakeAuthApi = (username, password) => {
	return new Promise((resolve, reject) => {
	  setTimeout(() => {
		const user = findUserByUserName(username);
		if (user.password === password) {
		  resolve({ success: true, status: 200 });
		}
		reject({ success: false, status: 401 });
	  }, 3000);
	});
  };
  
async function Login(formData) {
  try {
    const response = await fetch("http://localhost:5500/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact: formData.phoneNo,
        password: formData.password,
      }),
    });

    const data = await response.json();
    // Check if the response status is not ok (not in 200-299 range)
    if (!data?.success) {
      throw new Error(data.message || "Something went wrong!");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

async function Register(formData) {
  console.log(formData, "login from user.js");
  try {
    const response = await fetch("http://localhost:5500/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.phoneNo,
        password: formData.password,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error, "Error Occurred while signing in");
  }
}

export const userApi = { Login, Register };

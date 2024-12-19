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
    if (!data?.success) {
      throw new Error(data.message || "Something went wrong!");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

async function Register(formData, currentUser) {
  try {
    const response = await fetch(`http://localhost:5500/api/${currentUser}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        contact: formData.contact,
        password: formData.password,
      }),
    });

    const data = await response.json();
    if (!data?.success) {
      throw new Error(data?.message || "Something went wrong");
    }
  } catch (error) {
    throw error;
  }
}

export const userApi = { Login, Register };

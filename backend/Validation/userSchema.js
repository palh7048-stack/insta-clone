const yup = require("yup");

const userSchema = yup.object({
  name: yup.string().required("Name is required"),

  email: yup .string()
    .email("Enter a valid email")
    .required("Email is required please Enter correct email"),

  userName: yup .string()
    .required("Enter the correct username"),

  password: yup.string() .required("Password is required")
    .min(6, "Password must be at least 6 characters")
});

module.exports = userSchema;
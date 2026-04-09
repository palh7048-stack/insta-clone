const yup = require("yup");

const signinSchema = yup.object({
  userName: yup.string().required("Please Enter username"),
  password: yup.string().required("Please Enter password")
});

module.exports = signinSchema;
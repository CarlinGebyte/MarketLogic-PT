import { Field, Form, Formik } from "formik";
import React from "react";
import logo from "../Assets/logo.png";
import * as Yup from "yup";
import styles from "../Styles/LoginRegister/LogReg.module.scss";
import axios from "axios";
import { url } from "../Utils/Url";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be 30 characters or less")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
function Register() {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    const send = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    axios
      .post(`${url}auth/signup`, send, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        navigate("/MarketLogic-PT/login");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      });
  };

  return (
    <div className={styles.background_auth}>
      <div className={styles.auth}>
        <div className={styles.auth_header}>
          <img className={styles.auth_header__logo} src={logo} alt="Logo" />
          <h1 className={styles.auth_header__title}>Dashboard Kit</h1>
          <p>Create your account</p>
        </div>
        <div className={styles.auth_body}>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm();
            }}
          >
            {({ errors, touched }) => (
              <Form className={styles.auth_body__form}>
                <div className={styles.auth_body__form___group}>
                  <label htmlFor="username">Username</label>
                  <Field
                    name="username"
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                  />
                  {errors.username && touched.username ? (
                    <div className={"error"}>{errors.username}</div>
                  ) : null}
                </div>
                <div className={styles.auth_body__form___group}>
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && touched.email ? (
                    <div className={"error"}>{errors.email}</div>
                  ) : null}
                </div>
                <div className={styles.auth_body__form___group}>
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                  {errors.password && touched.password ? (
                    <div className="error">{errors.password}</div>
                  ) : null}
                </div>
                <div className={styles.auth_body__form___group}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="error">{errors.confirmPassword}</div>
                  ) : null}
                </div>
                <div>
                  <Link to="/MarketLogic-PT/login">Have an account ?</Link>
                </div>
                <button type="submit">Register</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;

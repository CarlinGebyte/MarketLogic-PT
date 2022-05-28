import { Field, Form, Formik } from "formik";
import React from "react";
import logo from "../Assets/logo.png";
import * as Yup from "yup";
import styles from "../Styles/LoginRegister/LogReg.module.scss";
import axios from "axios";
import { url } from "../Utils/Url";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});
function Login() {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const send = JSON.stringify({
      email: values.email,
      password: values.password,
    });
    axios
      .post(`${url}auth/signin`, send, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.userRole);
        
        setTimeout(() => {
          navigate("/MarketLogic-PT/Overview");
        }, 1000);
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
          <p>Enter your email and password below</p>
        </div>
        <div className={styles.auth_body}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm();
            }}
          >
            {({ errors, touched }) => (
              <Form className={styles.auth_body__form}>
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
                <div>
                  <Link to="/MarketLogic-PT/register">
                    Don't have an account ?
                  </Link>
                </div>
                <button type="submit">Login</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;

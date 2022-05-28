import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { url } from "../Utils/Url";
import styles from "../Styles/Add/Add.module.scss";
import Swal from "sweetalert2";

const addSchema = Yup.object().shape({
  description: Yup.string()
    .min(8, "Description must be at least 8 characters")
    .required("Required"),
  priority: Yup.string().required("Required"),
});
function Add() {
  return (
    <div className={styles.add}>
      <div className={styles.add_header}>
        <h1>Add Ticket</h1>
      </div>
      <div>
        <Formik
          initialValues={{ description: "", priority: "" }}
          validationSchema={addSchema}
          onSubmit={(values, { resetForm }) => {
            axios
              .post(`${url}tickets/add`, JSON.stringify(values), {
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": localStorage.getItem("token"),
                },
              })
              .then((res) => {
                Swal.fire("Good job!", "You created a ticket", "success");
              })
              .catch((err) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: err.response.data.message,
                });
              });

            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.add_form}>
              <div className={styles.add_form_content}>
                <label htmlFor="description">Description</label>
                <Field
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Enter the description"
                />
                {errors.description && touched.description ? (
                  <div className="error">{errors.description}</div>
                ) : null}
              </div>
              <div className={styles.add_form_content}>
                <label htmlFor="priority">Priority</label>
                <Field as="select" id="priority" name="priority">
                  <option value="" defaultValue={""} hidden>
                    Select Priority
                  </option>
                  <option value="LOW">Low</option>
                  <option value="NORMAL">Normal</option>
                  <option value="HIGH">High</option>
                </Field>
                {errors.priority && touched.priority ? (
                  <div className="error">{errors.priority}</div>
                ) : null}
              </div>
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Add;

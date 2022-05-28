import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import styles from "../Styles/Edit/Edit.module.scss";
import { url } from "../Utils/Url";

const editSchema = Yup.object().shape({
  description: Yup.string()
    .min(8, "Description must be at least 8 characters")
    .required("Required"),
  priority: Yup.string().required("Required"),
});

const EditTicket = ({ modal, close }) => {
  const handleClose = () => {
    close(false);
  };

  const handleSubmit = (values) => {
    axios
      .put(`${url}tickets/update/${modal._id}`, JSON.stringify(values), {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        Swal.fire("Good job!", "Edited correctly", "success");
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
    <div className={styles.modalBg}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h2>Edit Ticket</h2>
          <button className={styles.modal_header_close} onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div>
          <Formik
            initialValues={{
              description: modal.description,
              priority: modal.priority,
            }}
            validationSchema={editSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm();
              close(false);
            }}
          >
            {({ errors, touched }) => (
              <Form className={styles.modal_form}>
                <div className={styles.modal_form_content}>
                  <label htmlFor="description">Description</label>
                  <Field
                    id="description"
                    name="description"
                    type="text"
                  ></Field>
                  {errors.description && touched.description ? (
                    <div className="error">{errors.description}</div>
                  ) : null}
                </div>
                <div className={styles.modal_form_content}>
                  <label htmlFor="priority">Priority</label>
                  <Field as="select" id="priority" name="priority">
                    <option value="LOW">Low</option>
                    <option value="NORMAL">Normal</option>
                    <option value="HIGH">High</option>
                  </Field>
                  {errors.priority && touched.priority ? (
                    <div className="error">{errors.priority}</div>
                  ) : null}
                </div>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditTicket;

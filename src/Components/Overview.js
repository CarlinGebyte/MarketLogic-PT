import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../Utils/Url";
import styles from "../Styles/Overview/Overview.module.scss";
import EditTicket from "./EditTicket";
import Swal from "sweetalert2";

function Overview() {
  const [tickets, setTickets] = useState([]);

  const [modal, setModal] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios(`${url}tickets`)
      .then((res) => {
        setTickets(res.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      });
  }, []);

  useEffect(() => {
    console.log(tickets);
  }, [tickets]);

  const handleEdit = (ticket) => {
    setModal(ticket);
    setOpen(true);
  };

  const deleteToken = (id) => {
    axios
      .delete(`${url}tickets/delete/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then(() => {
        setTickets(tickets.filter((ticket) => ticket._id !== id));
        Swal.fire("Good job!", "You deleted the ticket", "success");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      });
  };

  const returnPriorityColor = (priority) => {
    switch (priority) {
      case "LOW":
        return "#FEC400";
      case "NORMAL":
        return "#29CC97";
      case "HIGH":
        return "#F12B2C";
      default:
        return "#FEC400";
    }
  };
  return (
    <div className={styles.overview}>
      <div className={styles.overview_header}>
        <h1>Overview</h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.overview_table}>
          <thead>
            <tr>
              <th scope="col">Ticket details</th>
              <th scope="col">Customer name</th>
              <th scope="col">Date</th>
              <th scope="col">Priority</th>
            </tr>
          </thead>
          <tbody className={styles.overview_table_body}>
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td
                  className={styles.ticket_details}
                  onClick={() => handleEdit(ticket)}
                >
                  <img src={ticket.userId.image} alt="user" />
                  <p>{ticket.description}</p>
                </td>
                <td onClick={() => handleEdit(ticket)}>
                  {ticket.userId.username}
                </td>
                <td onClick={() => handleEdit(ticket)}>
                  {new Date(ticket.createdAt).toDateString()}
                </td>
                <td onClick={() => handleEdit(ticket)}>
                  <p
                    className={styles.priority}
                    style={{
                      backgroundColor: returnPriorityColor(ticket.priority),
                    }}
                  >
                    {ticket.priority}
                  </p>
                </td>
                <td className={styles.actions}>
                  <button onClick={() => deleteToken(ticket._id)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open ? <EditTicket modal={modal} close={setOpen} /> : null}
    </div>
  );
}

export default Overview;

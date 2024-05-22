import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { REST_API_BASE_URL } from "../../../App";
const AllStudents = () => {
  const [active, setActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [Students, setStudents] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handlePromoteToAdmin = async (id) => {
    try {
      const response = await axios.put(
        `${REST_API_BASE_URL}/user/promote-to-admin/${id}`
      );

      if (response.status === 200) {
        setSuccessMessage(`User promoted to admin successfully`);
        // Refresh the user list after promoting to admin
        fetchAllUsers();
      } else {
        console.error("Failed to promote user to admin");
      }
    } catch (error) {
      console.error("Error promoting user to admin:", error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to your server using Axios
      const response = await axios.delete(
        `${REST_API_BASE_URL}/user/delete/${id}`
      );

      // Check if the request was successful
      if (response.status === 200) {
        setSuccessMessage(`Student deleted successfully`);

        console.log("Student deleted successfully");
        // Update the user list after successful deletion
        setStudents(Students.filter((Student) => Student.id !== id));
      } else {
        // Handle other statuses, e.g., display an error message
        console.error("Failed to delete item");
      }
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error deleting item:", error.message);
    }
  };

  const fetchAllUsers = () => {
    fetch(`${REST_API_BASE_URL}/user/allusers`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const toggleMenu = () => {
    setActive(!active);
  };

  return (
    <div className={`main ${active ? "active" : ""}`}>
      <div className="topbar">
        <div className="toggle" onClick={toggleMenu}>
          <ion-icon name="menu-outline"></ion-icon>
        </div>
        <div className="search">
          <label>
            <input type="text" placeholder="Search here" />
            <ion-icon name="search-outline"></ion-icon>
          </label>
        </div>

        <div className="user">
          <img src="assets/imgs/customer01.jpg" alt="" />
        </div>
      </div>
      <div className="detailss ">
        <div className="recentOrderss">
          <div style={{ padding: "5px" }}>
            {/* Your message alert */}
            <Link to="/admin/student-add" className="btn btn-dark mb-3">
              Add New
            </Link>

            <table className="table table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">phone</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Students.length === 0 ? (
                  <tr>
                    <td colSpan="6">User not found</td>
                  </tr>
                ) : (
                  Students.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.fname}</td>
                      <td>{item.lname}</td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>
                      <td>{item.phone}</td>
                      <td>{item.role =="ADMIN"?" ":<Link
                          to={`/admin/student-edit/${item.id}`}
                          className="link-dark"
                        >
                          <FontAwesomeIcon
                            icon={faPencilAlt}
                            className="me-3"
                          />
                        </Link>}
                        
                        <button
                          className="btn"
                          onClick={() => handlePromoteToAdmin(item.id)}
                        >
                          <FontAwesomeIcon icon={faUserPlus} />
                          
                        </button>
                        <button
                          className="btn "
                          onClick={() => handleDelete(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AllStudents;

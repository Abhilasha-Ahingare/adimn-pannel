import React, { useEffect, useState } from "react";
import { UserAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { Link, Outlet } from "react-router-dom";
import "./adminUser.css";

const apiUrl = import.meta.env.VITE_SERVER_URL;

const UserAdmin = () => {
  const { authorization } = UserAuth();
  const [users, setUsers] = useState([]);

  // Fetch all users
  const getAllUserData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch user data");
    }
  };

  // User delete function
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("User deleted successfully");
        getAllUserData();
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch user data");
    }
  };

  //admin make

  const AdminUpdate = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/admin/users/update-Admin/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update user");
      }

      const statusText = result.user.isAdmin
        ? "now admin"
        : "admin access removed";
      toast.success(`User is ${statusText}`);

      getAllUserData();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  return (
    <section className="admin-users-container">
      <div className="user-container">
        <h1 className="admin-users-title">Users List</h1>
      </div>
      <div className="admin-users">
        {users && users.length > 0 ? (
          <table className="user-grid-admin">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Link to={`/admin/users/update/${user._id}`}>Edit</Link>
                  </td>
                  <td>
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                  </td>
                  <td>
                    <button onClick={() => AdminUpdate(user._id)}>
                      {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found</p>
        )}
      </div>
      <Outlet />
    </section>
  );
};

export default UserAdmin;

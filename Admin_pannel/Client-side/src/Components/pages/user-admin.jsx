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
        getAllUserData();
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch user data");
    }
  };

  //admin make

  const AdminMake = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/admin/users/make-admin/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
        }
      );

      if (response.ok) {
        getAllUserData();
        toast.success("user is successfully promoted to admin");
      }
    } catch (error) {
      toast.error("user is not found");
    }
  };

  //remove admin
  const RemoveAdmin = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/admin/users/remove-admin/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
        }
      );

      if (response.ok) {
        getAllUserData();
        toast.success(" remove admin permission");
      }
    } catch (error) {
      toast.error("user is not found");
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
          <table className="user-grid">
            <thead>
              <tr>
                <th>name</th>
                <th>email</th>
                <th>phone</th>
                <th>delete</th>
                <th>edit</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {/* Correct use of Link for navigation */}
                    <Link to={`/admin/users/update/${user._id}`}>Edit</Link>
                  </td>
                  <td>
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                  </td>

                  <td>
                    <button
                      onClick={() => AdminMake(user._id)}
                      onDoubleClick={() => RemoveAdmin(user._id)}
                    >
                      {user.isAdmin === true ? "Admin" : "guest"}
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

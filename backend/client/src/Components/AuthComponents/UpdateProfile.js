import React from "react";

export default function UpdateProfile({
  name,
  handleChange,
  handleRoleChange,
  updateUser,
  chosenRole,
}) {
  return (
    <div>
      {/*Header */}
      <div className="header">
        {/*Header logo */}
        <h3 className="logo">o7 Arena</h3>
      </div>
      {/*Update profile heading*/}
      <h1>Update profile</h1>
      {/*update profile form */}
      <form className="updateForm">
        {/*Name input */}
        <div className="credentials">
          <label htmlFor=""> Name: </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        {/*Role selection */}
        <div className="credentials">
          <select value={chosenRole} onChange={handleRoleChange}>
            <option value={"none"}>Choose Role</option>
            <option value="Subscriber">Subscriber</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/*Update profile button which invokes the updateUser function when clicked */}
        <button className="updateBtn" onClick={updateUser}>
          Update Profile
        </button>
      </form>
    </div>
  );
}

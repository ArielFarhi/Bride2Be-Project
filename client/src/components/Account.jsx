import React, { useState, useEffect } from "react";

const Account = ({ user }) => {
  return (
    <div>
      <div className="account-page">
        <h1>Account Details</h1>
        <div className="account-details">
          <p><strong>Username: </strong> {user.username}</p>
          <p><strong>Email: </strong> {user.email}</p>
          <p><strong>Phone: </strong>{user.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Account;

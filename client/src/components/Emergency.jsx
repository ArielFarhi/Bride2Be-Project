import React, { useEffect, useState } from "react";
import Header from "./Header";

const Emergency = ({ user }) => {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/vendors");
        if (!response.ok) {
          throw new Error("Failed to fetch vendors");
        }
        const data = await response.json();
        setVendors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  if (loading) {
    return <div className="emergency-page">Loading...</div>;
  }

  if (error) {
    return <div className="emergency-page">Error: {error}</div>;
  }

  return (
    <div>
      <Header user={user} />
      <div className="emergency-page">
        <h1>Emergency Contacts</h1>
        <div className="vendor-list">
          {vendors.map((vendor) => (
            <div key={vendor._id} className="vendor-item">
              <h2>{vendor.fullName}</h2>
              <p><strong>Category:</strong> {vendor.category}</p>
              <p><strong>Email:</strong> {vendor.email}</p>
              <p><strong>Phone:</strong> {vendor.phone}</p>
              <p><strong>Region:</strong> {vendor.region}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Emergency;

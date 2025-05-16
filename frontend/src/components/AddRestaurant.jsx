import React, { useState } from "react";
import axios from "axios";
import "../styles/AddRestaurant.css"; 

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [tables, setTables] = useState([{ tableNumber: "", capacity: "" }]);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("cuisine", cuisine);
    formData.append("tables", JSON.stringify(tables));
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:5000/api/restaurants/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Restaurant added successfully!");
      window.location.href = "/restaurants";
    } catch (err) {
      console.error("Error adding restaurant", err);
      alert("Failed to add restaurant. Please try again.");
    }
  };

  const handleTableChange = (index, e) => {
    const newTables = [...tables];
    newTables[index][e.target.name] = e.target.value;
    setTables(newTables);
  };

  const addTable = () => {
    setTables([...tables, { tableNumber: "", capacity: "" }]);
  };

  const removeTable = (index) => {
    const newTables = tables.filter((_, i) => i !== index);
    setTables(newTables);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="add-restaurant-container">
      <div className="form-box">
        <h2>Add Your Business With Us</h2>
        <form onSubmit={handleSubmit} className="restaurant-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Restaurant Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              required
            />
          </div>
          <div className="restaurant-form">
            <h3>Tables</h3>
            {tables.map((table, index) => (
              <div key={index} className="input-group ">
                <input
                  type="number"
                  name="tableNumber"
                  placeholder="Table Number"
                  value={table.tableNumber}
                  onChange={(e) => handleTableChange(index, e)}
                  required
                />
                <input
                  type="number"
                  name="capacity"
                  placeholder="Capacity"
                  value={table.capacity}
                  onChange={(e) => handleTableChange(index, e)}
                  required
                />
                
              </div>
            ))}
            <div><button
                  type="button"
                  className="btn remove-btn"
                  onClick={() => removeTable(index)}
                >
                  Remove
                </button>
                <button type="button" className="btn add-btn" onClick={addTable}>
              Add Table
            </button></div>
            
          </div>
          <div className="input-group">
            <label><b>Upload Restaurant Image</b></label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="file-input"
            />
          </div>
          <button type="submit" className="btn submit-btn">
            Add Restaurant
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;

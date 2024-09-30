import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar/Sidebar'
import CrossIcon from '../CrossIcon/CrossIcon';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/food/list");
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching the food list");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the food list");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/food/admin/remove", { id: foodId });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error removing the food item");
      }
    } catch (error) {
      toast.error("An error occurred while removing the food item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="list">
        <form className="list-form flex-col">
          <h1 className="header">All Foods List</h1>
          <div className="list-table">
            <div className="list-table-format title">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b>Action</b>
            </div>
            {list.map((item, index) => (
              <div key={index} className="list-table-format">
                <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <CrossIcon onClick={() => removeFood(item._id)} />
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default List;

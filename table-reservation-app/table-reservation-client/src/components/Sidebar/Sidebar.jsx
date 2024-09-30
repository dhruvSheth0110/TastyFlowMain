import React from 'react'
import "./Sidebar.css"
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = ({showAlert}) => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/admin/add' className="sidebar-option">
        <i class="fa-solid fa-circle-plus" style={{fontSize:"1.3rem"}}></i>
            <p>Add Items</p>
        </NavLink>

        <NavLink to='/list' className="sidebar-option">
        <i class="fa-solid fa-list-check" style={{fontSize:"1.3rem"}}></i>
            <p>List Items</p>
        </NavLink>

        <NavLink to='/admin/table' className="sidebar-option">
        <img src={assets.table_resrvation} alt="" />
            <p>Tables</p>
        </NavLink>
        <NavLink to='/admin/all-users' className="sidebar-option">
        <i class="fa-solid fa-users" style={{fontSize:"1.3rem"}}></i>
            <p>User Data</p>
        </NavLink>
        <NavLink to='/admin/all-reviews' className="sidebar-option">
        <i class="fa-regular fa-comments" style={{fontSize:"1.3rem"}}></i>
            <p>Reviews</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar

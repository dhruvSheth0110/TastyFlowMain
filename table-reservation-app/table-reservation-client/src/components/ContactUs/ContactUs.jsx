import React, { useState, useEffect } from 'react';
import './ContactUs.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        message: "",
    });

    const [userDetails, setUserDetails] = useState({ name: "", email: "", contact: "", id: "" });
    let navigate = useNavigate();

    // Function to handle form changes (only for the message field)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const token = localStorage.getItem("token");
          const response = await fetch("http://localhost:5000/api/message/store-message", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
            body: JSON.stringify({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              contact: formData.phone, // Use 'contact' instead of 'phone' as required by the schema
              message: formData.message,
            }),
          });
      
          if (response.ok) {
            const result = await response.json();
            toast.success(result.message); // Alert success message
            setFormData({ ...formData, message: "" }); // Reset message only
          } else {
            const error = await response.json();
            toast.error(error.message);
          }
        } catch (error) {
          console.error("Error submitting message:", error);
          alert("An error occurred while submitting your message.");
        }
      };
      

    // Function to fetch user details
    const fetchUserDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return null;
            }
            const response = await fetch("http://localhost:5000/api/users/getuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            });
            if (response.ok) {
                return await response.json();
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching user details:", error.message);
            return null;
        }
    };

    // Effect to get user details on component mount
    useEffect(() => {
        const getUserDetails = async () => {
            const userData = await fetchUserDetails();
            if (localStorage.getItem("token")) {
                if (userData) {
                    setUserDetails(userData);
                    const fullName = userData.name || "";
                    const nameParts = fullName.split(" ");
                    const firstName = nameParts[0];
                    const lastName = nameParts.slice(1).join(" ");
                    setFormData({
                        firstName: firstName || "",
                        lastName: lastName || "",
                        email: userData.email || "",
                        phone: userData.contact || "",
                        message: "",
                    });
                } else {
                    setUserDetails({ name: "", email: "", id: "" });
                }
            } else {
                navigate("/");
            }
        };

        getUserDetails();
    }, [navigate]);

    return (
        <div className="container contact-container">
            <div className="contact-info">
                <h4 className="contact-tagline">Contact</h4>
                <h1 className="contact-title">Contact Us</h1>
                <p className="contact-description">
                    Whether you have a question about services, prices, need any other
                    details, please contact us using the form and other information on
                    this page.
                </p>
                <div className="open-hours">
                    <h3>Open Hours</h3>
                    <p>Mon - Fri : 08.00 AM TO 09.00 PM</p>
                    <p>Sat : 09.00 AM TO 06.00 PM</p>
                    <p>Sunday : 09.00 AM TO 02.00 PM</p>
                </div>
            </div>

            <div className="contact-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="tel"
                                name="contact"
                                value={formData.phone}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Enter Your Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="I would like to get in touch with you..."
                            required
                        />
                    </div>

                    <button type="submit" className="reserve-button">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;

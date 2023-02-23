import React, { useState } from "react";
import { createStudent } from "../components/StudentServices";
import "../styles/AddStudent.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import Alert from "react-bootstrap/Alert";
import moment from "moment";

const AddStudent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [createResult, setCreateResult] = useState(null);
  const [errors, setErrors] = useState({});

  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
    subject: "",
    nationalID: "",
    mobileNumber: "",
    email: "",
  });

  const handleClose = () => setCreateResult(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const validate = (data) => {
    const errors = {};

    // National ID validation
    if (!data.nationalID) {
      errors.nationalID = "National ID is required.";
    } else if (!/^\d{9}[Vv]$|^\d{12}$/.test(data.nationalID)) {
      errors.nationalID = "National ID format not matching.";
    }

    // Mobile Number validation
    if (!data.mobileNumber) {
      errors.mobileNumber = "Mobile Number is required.";
    } else if (!/^\d{10}$/.test(data.mobileNumber)) {
      errors.mobileNumber = "Mobile Number must be 10 digits";
    }

    // Email validation
    if (!data.email) {
      errors.email = "Email is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)
    ) {
      errors.email = "Invalid email format.";
    }

    // Other required fields validation
    if (!data.firstName) {
      errors.firstName = "First Name is required.";
    }
    if (!data.lastName) {
      errors.lastName = "Last Name is required.";
    }
    if (!data.DOB) {
      errors.DOB = "DOB is required.";
    }
    if (!data.subject) {
      errors.subject = "Subject is required.";
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // validate the inputs before submission
    const errors = validate(studentData);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    // insert the studentData into API
    var result = createStudent(studentData);

    result
      .then((res) => {
        if (res === true) {
          setCreateResult(true);
        } else {
          setCreateResult(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(studentData);
    // reset the form after submission
    setStudentData({
      firstName: "",
      lastName: "",
      DOB: startDate,
      nationalID: "",
      mobileNumber: "",
      email: "",
    });
  };

  const ErrorMessage = ({ error }) => {
    return <div style={{ color: "red" }}>{error}</div>;
  };

  return (
    <div className="AddStudent">
      {createResult === true && (
        <Alert
          className="alert"
          variant="success"
          dismissible
          onClose={handleClose}
        >
          <Alert.Heading>Student Registered Successfully!</Alert.Heading>
        </Alert>
      )}
      {createResult === false && (
        <Alert
          className="alert"
          variant="danger"
          dismissible
          onClose={handleClose}
        >
          <Alert.Heading>Student Registration Failed!</Alert.Heading>
        </Alert>
      )}
      <div className="Header">
        <h2>Register Students</h2>
      </div>

      <div className="Form">
        <FloatingLabel controlId="floatingInput" label="First Name">
          <Form.Control
            type="name"
            placeholder="First Name"
            value={studentData.firstName}
            onChange={handleChange}
            name="firstName"
          />
          <ErrorMessage error={errors.firstName} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Last name">
          <Form.Control
            type="name"
            placeholder="Last name"
            value={studentData.lastName}
            onChange={handleChange}
            name="lastName"
          />
          <ErrorMessage error={errors.lastName} />
        </FloatingLabel>
        <div className="DatePickerContainer">
          <DatePicker
            name="DOB"
            className="DatePicker"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setStudentData({
                ...studentData,
                DOB: moment(date).format("YYYY-MM-DD"),
              });
            }}
          />
          <ErrorMessage error={errors.DOB} />
        </div>
        <FloatingLabel controlId="floatingSelect" label="Select a Subject">
          <Form.Select
            aria-label="Floating label select example"
            value={studentData.subject}
            onChange={handleChange}
            name="subject"
          >
            <option value="0" defaultValue>
              -
            </option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Database Management Systems">
              Database Management Systems
            </option>
            <option value="Enterprise Application Development">
              Enterprise Application Development
            </option>
            <option value="Operating Systems">Operating Systems</option>
            <option value="Web Application Development">
              Web Application Development
            </option>
            <option value="Object-Oriented Programming">
              Object-Oriented Programming
            </option>
          </Form.Select>
        </FloatingLabel>
        <ErrorMessage error={errors.subject} />
        <FloatingLabel controlId="floatingInput" label="National ID">
          <Form.Control
            type="text"
            placeholder="National ID"
            value={studentData.nationalID}
            onChange={handleChange}
            name="nationalID"
          />
        </FloatingLabel>
        <ErrorMessage error={errors.nationalID} />
        <FloatingLabel controlId="floatingInput" label="Phone Number">
          <Form.Control
            type="text"
            placeholder="Phone Number"
            value={studentData.mobileNumber}
            onChange={handleChange}
            name="mobileNumber"
          />
        </FloatingLabel>
        <ErrorMessage error={errors.mobileNumber} />
        <FloatingLabel controlId="floatingInput" label="Email">
          <Form.Control
            type="email"
            placeholder="Email"
            value={studentData.email}
            onChange={handleChange}
            name="email"
          />
        </FloatingLabel>
        <ErrorMessage error={errors.email} />
        <Button variant="primary" onClick={handleSubmit}>
          Register
        </Button>{" "}
      </div>
    </div>
  );
};

export default AddStudent;

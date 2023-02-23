import React, { useState, useEffect } from "react";
import "../styles/ViewStudent.css";
import {
  getAllStudents,
  updateStudent,
  deleteStudent,
} from "../components/StudentServices";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdDownloadDone } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

function ViewStudent() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  //This useEffect function is called when the component is loaded to retrieve all students details to display in the grid
  useEffect(() => {
    const fetchData = async () => {
      const students = await getAllStudents();
      setStudents(students);
    };
    fetchData();
  }, []);

  //This function is called when the user clicks on the update button
  const handleUpdate = async (student) => {
    await updateStudent(student.id, student);
    setEditing(false);
    setSelectedStudent(null);
    const updatedStudents = await getAllStudents();
    setStudents(updatedStudents);
  };

  //This function is called when the user clicks on the delete confirmation button
  const handleDelete = async (id) => {
    await deleteStudent(id);
    const updatedStudents = students.filter((s) => s.id !== id);
    setStudents(updatedStudents);
  };

  //This function is called when the user clicks on the edit button
  const handleEdit = (student) => {
    setEditing(true);
    setSelectedStudent(student);
  };

  //This function is called when the user clicks on the cancel button
  const handleCancel = () => {
    setEditing(false);
    setSelectedStudent(null);
  };

  //this will handle the change in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedStudent({ ...selectedStudent, [name]: value });
  };

  return (
    <div className="ViewStudent">
      <Modal show={showModal}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(false);
              handleDelete(deleteId);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="Header">
        <h2>View Students</h2>
      </div>
      <div className="StudentsGrid table-responsive">
        <Table className="table" responsive="sm" striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Subject</th>
              <th>National ID</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {students.map((student) => {
              if (
                editing &&
                selectedStudent &&
                selectedStudent.id === student.id
              ) {
                return (
                  <tr className="trUpdate" key={student.id}>
                    <td>{student.id}</td>
                    <td>
                      <input
                        className="inputUpdate"
                        type="text"
                        name="firstName"
                        value={selectedStudent.firstName}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        className="inputUpdate"
                        type="text"
                        name="lastName"
                        value={selectedStudent.lastName}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        className="inputUpdate"
                        type="text"
                        name="dob"
                        value={selectedStudent.dob}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        className="inputUpdate"
                        type="text"
                        name="subject"
                        value={selectedStudent.subject}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        className="inputUpdate"
                        type="text"
                        name="nationalId"
                        value={selectedStudent.nationalId}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        className="inputUpdate"
                        type="text"
                        name="mobileNumber"
                        value={selectedStudent.mobileNumber}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        className="inputUpdate"
                        type="text"
                        name="email"
                        value={selectedStudent.email}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <Button
                        style={{ borderRadius: "10px" }}
                        className="btnView"
                        variant="primary"
                        onClick={() => handleUpdate(selectedStudent)}
                      >
                        <MdDownloadDone />
                      </Button>
                      <Button
                        style={{ borderRadius: "10px" }}
                        className="btnView"
                        variant="secondary"
                        onClick={handleCancel}
                      >
                        <MdOutlineCancel />
                      </Button>
                    </td>
                  </tr>
                );
              }
              return (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.dob}</td>
                  <td>{student.subject}</td>
                  <td>{student.nationalId}</td>
                  <td>{student.mobileNumber}</td>
                  <td>{student.email}</td>
                  <td>
                    <Button
                      style={{ borderRadius: "10px" }}
                      className="btnView"
                      variant="success"
                      onClick={() => handleEdit(student)}
                    >
                      <FiEdit />
                    </Button>
                    <Button
                      style={{ borderRadius: "10px" }}
                      className="btnView"
                      variant="danger"
                      onClick={() => {
                        setShowModal(true);
                        setDeleteId(student.id);
                      }}
                    >
                      <AiOutlineDelete />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ViewStudent;

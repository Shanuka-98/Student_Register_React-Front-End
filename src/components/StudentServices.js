import axios from "axios";

const baseUrl = "https://localhost:7023/api/students";

// Function to retrieve all students
const getAllStudents = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// Function to create a new student
const createStudent = async (student) => {
  try {
    const response = await axios.post(baseUrl, student, {});
    console.log(response);
    if (response.status === 201) {
      console.log("Student created successfully");
      return true;
    } else {
      console.log("Student creation failed");
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

// Function to update an existing student
const updateStudent = async (id, student) => {
  const response = await axios.put(`${baseUrl}/${id}`, student);
  return response.data;
};

// Function to delete a student
const deleteStudent = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

// Function to retrieve a specific student by id
// const getStudentById = async (id) => {
//   const response = await axios.get(`${baseUrl}/${id}`);
//   return response.data;
// };

export {
  getAllStudents,
  // getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};

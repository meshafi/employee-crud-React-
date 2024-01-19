import React, { useState } from "react";
import styled from "styled-components";
import EmployeeService from "../services/employeeService";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: Roboto;
  font-weight: 300;
`;

const Heading = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => (props.disabled ? "#dddddd" : "#4caf50")};
  color: ${(props) => (props.disabled ? "#555555" : "white")};
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;
  margin-bottom: 10px;
  &:hover {
    background-color: ${(props) => (props.disabled ? "#dddddd" : "#45a049")};
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  margin-top: 10px;
`;
const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
`;

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    address: "",
    hireDate: "",
    salary: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError) {
      console.error("Email error:", emailError);
      setErrorMessage("Error adding employee. Please fix the email format.");
      setTimeout(()=>{
        setErrorMessage("");
      },2000)
      return;
    }
    try {
      const response = await EmployeeService.addEmployee(formData);
      setSuccessMessage("Employee added successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error adding employee:", error);
      setSuccessMessage("Error adding employee. Please try again.");
    }
  };

  return (
    <Container>
      <Heading>Fill Employee Details</Heading>
      <form onSubmit={handleSubmit}>
        <FormSection>
          <h3>Name:</h3>
          <Input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            onKeyDown={(e) => {
              const isAlphabet = /^[A-Za-z\s]+$/.test(e.key);
              if (!isAlphabet) {
                e.preventDefault();
              }
            }}
          />
        </FormSection>

        <FormSection>
          <h3>Position:</h3>
          <Input
            type="text"
            name="position"
            placeholder="Enter position"
            value={formData.position}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection>
          <h3>Department:</h3>
          <Input
            type="text"
            name="department"
            placeholder="Enter department"
            value={formData.department}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection>
          <h3>Email:</h3>
          <Input
            type="text"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            onBlur={(e) => {
              const enteredEmail = e.target.value;
              const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                enteredEmail
              );

              if (!isEmailValid) {
                setEmailError("Invalid email format");
              } else {
                setEmailError("");
              }
            }}
          />
        </FormSection>

        <FormSection>
          <h3>Phone:</h3>
          <Input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number (Numeric only)"
            onKeyDown={(e) => {
              const isNumericOrBackspace =
                /^[0-9]+$/.test(e.key) || e.key === "Backspace";
              if (!isNumericOrBackspace) {
                e.preventDefault();
              }
            }}
          />
        </FormSection>

        <FormSection>
          <h3>Address:</h3>
          <Input
            type="text"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection>
          <h3>Hire Date:</h3>
          <Input
            type="date"
            name="hireDate"
            value={formData.hireDate}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection>
          <h3>Salary:</h3>
          <Input
            type="number"
            name="salary"
            placeholder="Enter salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection>
          <Button
            type="submit"
            disabled={
              !formData.name ||
              !formData.email ||
              !formData.address ||
              !formData.department ||
              !formData.hireDate ||
              !formData.phone ||
              !formData.salary ||
              !formData.salary
            }
          >
            Submit
          </Button>
        </FormSection>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errorMessage&&<ErrorMessage>{errorMessage}</ErrorMessage>}
      </form>
    </Container>
  );
};

export default EmployeeForm;

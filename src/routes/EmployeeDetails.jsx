import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EmployeeService from "../services/employeeService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Heading = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const FieldWrapper = styled.div`
  margin-top: 20px;
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
  background-color: ${(props) => (props.isUpdate ? "green" : "#3498db")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.isUpdate ? "darkgreen" : "#1e6a9c")};
  }

  &:disabled {
    background-color: #dddddd;
    color: #555555;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  color: green;
  font-weight: bold;
  margin-top: 10px;
`;

const DeleteButton = styled(Button)`
  margin-bottom: 25px;
  background-color: ${(props) =>
    props.isUpdate ? "rgb(101, 100, 100)" : "rgb(246, 46, 46)"};
  &:hover {
    background-color: ${(props) =>
      props.isUpdate ? "rgb(75, 75, 75)" : "rgb(208, 11, 11)"};
  }
`;

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    address: "",
    hireDate: "",
    salary: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await EmployeeService.getEmployeeById(id);
        response.data.hireDate = response.data.hireDate.slice(0, 10);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const toggleEditMode = (e) => {
    e.preventDefault();
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const toggleEditModeCancel = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    if (!isValidEmail(employee.email)) {
      setErrorMessage("Invalid email format");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }
    try {
      await EmployeeService.updateEmployee(id, employee);
      setSuccessMessage("Employee updated successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      toggleEditMode(e);
    } catch (error) {
      console.error("Error updating employee:", error);
      setErrorMessage("Error updating employee. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  const deleteAndRedirect = async (e) => {
    e.preventDefault();
    try {
      await EmployeeService.deleteEmployee(id);
      setDeleteSuccessMessage("Employee deleted successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error deleting employee:", error);
      setErrorMessage("Error deleting employee. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  const anyFieldEmpty = () => {
    return Object.values(employee).some((value) => !value);
  };

  return (
    <Container>
      <Heading>Employee Details</Heading>
      <form>
        <FieldWrapper>
          <h3>Name:</h3>
          <Input
            type="text"
            placeholder="Enter name"
            value={employee.name}
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            disabled={!editMode}
            required
            onKeyDown={(e) => {
              const isAlphabet = /^[A-Za-z\s]+$/.test(e.key);
              if (!isAlphabet) {
                e.preventDefault();
              }
            }}
          />
        </FieldWrapper>

        <FieldWrapper>
          <h3>Position:</h3>
          <Input
            type="text"
            placeholder="Enter position"
            value={employee.position}
            onChange={(e) =>
              setEmployee({ ...employee, position: e.target.value })
            }
            disabled={!editMode}
            required
          />
        </FieldWrapper>

        <FieldWrapper>
          <h3>Department:</h3>
          <Input
            type="text"
            placeholder="Enter department"
            value={employee.department}
            onChange={(e) =>
              setEmployee({ ...employee, department: e.target.value })
            }
            disabled={!editMode}
            required
          />
        </FieldWrapper>

        <FieldWrapper>
          <h3>Email:</h3>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            value={employee.email}
            onChange={(e) =>
              setEmployee((prevEmployee) => ({
                ...prevEmployee,
                email: e.target.value,
              }))
            }
            disabled={!editMode}
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          />
        </FieldWrapper>

        <FieldWrapper>
          <h3>Phone:</h3>
          <Input
            type="number"
            placeholder="Enter phone number (Numeric only)"
            value={employee.phone}
            onChange={(e) =>
              setEmployee({ ...employee, phone: e.target.value })
            }
            disabled={!editMode}
            onKeyDown={(e) => {
              const isNumericOrBackspace =
                /^[0-9]+$/.test(e.key) || e.key === "Backspace";
              if (!isNumericOrBackspace) {
                e.preventDefault();
              }
            }}
            required
            pattern="^[0-9]+$"
          />
        </FieldWrapper>

        <FieldWrapper>
          <h3>Address:</h3>
          <Input
            type="text"
            placeholder="Enter address"
            value={employee.address}
            onChange={(e) =>
              setEmployee({ ...employee, address: e.target.value })
            }
            disabled={!editMode}
            required
          />
        </FieldWrapper>

        <FieldWrapper>
          <h3>Hire Date:</h3>
          <Input
            type="date"
            value={employee.hireDate}
            onChange={(e) =>
              setEmployee({ ...employee, hireDate: e.target.value })
            }
            disabled={!editMode}
            required
          />
        </FieldWrapper>

        <FieldWrapper>
          <h3>Salary:</h3>
          <Input
            type="number"
            placeholder="Enter salary"
            value={employee.salary}
            onChange={(e) =>
              setEmployee({ ...employee, salary: e.target.value })
            }
            disabled={!editMode}
            required
            pattern="^[0-9]+$"
          />
        </FieldWrapper>

        <div className="buttons">
          <Button
            onClick={(e) => (editMode ? updateEmployee(e) : toggleEditMode(e))}
            isUpdate={editMode}
            disabled={anyFieldEmpty()}
          >
            {editMode ? "Update" : "Edit"}
          </Button>

          <DeleteButton
            onClick={(e) =>
              !editMode ? deleteAndRedirect(e) : toggleEditModeCancel()
            }
            isUpdate={editMode}
          >
            {editMode ? "Cancel" : "Delete"}
          </DeleteButton>
        </div>

        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {deleteSuccessMessage && (
          <SuccessMessage>{deleteSuccessMessage}</SuccessMessage>
        )}
      </form>
    </Container>
  );
};

export default EmployeeDetails;

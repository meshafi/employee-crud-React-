import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import EmployeeService from "../services/employeeService";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [totalItems,setTotalItems]=useState();
  const perPage = 8;

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const response = await EmployeeService.getEmployees(
          currentPage,
          perPage
        );
        setTotalItems(response.data.total_count);
        console.log(totalItems);
        setEmployees(response.data.items);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [currentPage,totalItems]);

  const totalPages = Math.ceil(totalItems / perPage);

  const onPageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {isLoading ? (
        <div className="loader" style={{margin:"20px"}}>
          <h3>Loading...</h3>
        </div>
      ) : (
        <div style={{ maxWidth: "87vw", margin: "0 35px" }}>
          <Typography
            variant="h4"
            style={{
              fontWeight: "bold",
              margin: "10px 0px",
              textAlign: "center",
            }}
          >
          Employee Dashboard
          </Typography>
          {/* <Button
            className="add"
            variant="contained"
            color="primary"
            component={Link}
            to="/add-employee"
            style={{
              marginBottom: "15px",
              width: "150px",
              marginLeft: "2px",
              marginRight: "auto",
              display: "block",
            }}
          >
            Add Employee
          </Button> */}
          <TableContainer component={Paper} style={{border:"1px solid gray",marginTop:"30px"}}>
            <Table className="mat-elevation-z8">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Role
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Department
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee._id}>
                    <TableCell>{employee._id}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/${employee._id}`}
                        variant="icon"
                        title="Show Details"
                        style={{ cursor: "pointer" }}
                      >
                        <VisibilityIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            style={{ marginTop: "15px" }}
          />
        </div>
      )}
    </div>
  );
};

export default Home;

import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/employees';

const EmployeeService = {
  getEmployees: (page, perPage) => {
    const params = { page, per_page: perPage };
    return axios.get(apiUrl, { params });
  },
  getEmployeeById: (id) => {
    return axios.get(`${apiUrl}/${id}`);
  },

  addEmployee: (employee) => {
    return axios.post(apiUrl, employee);
  },

  updateEmployee: (id, employee) => {
    const { _id, ...updatePayload } = employee;
    return axios.put(`${apiUrl}/${id}`, updatePayload);
  },

  deleteEmployee: (id) => {
    return axios.delete(`${apiUrl}/${id}`);
  },
};

export default EmployeeService;

import React from "react";
import { Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

const Sidebar = () => {
  return (
    <Paper
      style={{
        top: 0,
        backgroundColor: "#202020",
        color: "white",
        width: "12vw",
        minHeight: "90vh",
        borderRadius: "0",
        fontSize: "18px",
        boxShadow: "none",
      }}
    >
      <div
        style={{
          padding: "10px 26px",
        }}
      >
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <div
            style={{
              display: "flex",
              flexWrap:"wrap",
              width:"6vw",
              alignItems: "center",
              gap: "20px",
              cursor: "pointer",
              padding: "7.5px 0px",
              borderRadius: "3px",
              marginTop: "20px",
              transition: "background-color 0.3s",
              "@media (min-width: 1140px)": {
                flexDirection:"column",
              }
            }}
            onClick={() => console.log("Home")}
            className="hover-effect"
          >
            <HomeIcon />
            Home
          </div>
        </Link>
        <Link
          to="/add-employee"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div
            style={{
              display: "flex",
              flexWrap:"wrap",
              alignItems: "center",
              gap: "20px",
              cursor: "pointer",
              padding: "7.5px 0px",
              borderRadius: "3px",
              transition: "background-color 0.3s",
              marginTop: "20px",
            }}
            onClick={() => console.log("Home")}
            className="hover-effect"
          >
            <PersonIcon />
            Add employee
          </div>
        </Link>
      </div>
      <style>
        {`
          .hover-effect:hover {
            background-color: #343434;
          }
        `}
      </style>
    </Paper>
  );
};

export default Sidebar;

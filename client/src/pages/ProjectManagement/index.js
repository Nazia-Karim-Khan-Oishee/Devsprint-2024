import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Stack from "react-bootstrap/Stack";
import axios from "axios";

import "./index.css";

const ProjectManagementPage = () => {
  const [projects, setProjects] = useState([]);
  const getUserProjects = async () => {
    try {
      const userId = "Owner1";

      axios
        .get("http://localhost:4000/projects/owned/" + userId)
        .then((response) => {
          console.log("Projects owned by the user:", response.data);
          setProjects(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserProjects();
  });

  return (
    <div>
      <div>
        <h1>Project Management</h1>
      </div>
      <div className="d-flex flex-row-reverse mb-5">
        <Button variant="primary" className="mx-3">
          <Stack direction="horizontal" gap={3}>
            <BsFillPlusCircleFill />
            Create Project
          </Stack>
        </Button>
      </div>
      <div>
        <ListGroup as="ol" numbered>
          {projects.map((project) => (
            <ListGroup.Item as="li" key={project._id}>
              <Link to={"/projects/" + project._id}>
                <h4>{project.name}</h4>
              </Link>
              <p>{project.description}</p>
              <Badge bg="primary">{project.status}</Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default ProjectManagementPage;

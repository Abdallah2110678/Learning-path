import React, { useEffect, useRef, useState } from "react";
import Back from "../common/back/Back";
import Heading from "../common/heading/Heading";
import { useParams } from "react-router-dom";
import axios from "axios";
import { REST_API_BASE_URL } from "../../App";
import './modal.css';
const SelectRoadmap = () => {
  const { id } = useParams();
  console.log(id);

  const [roadmap, setRoadmap] = useState({});
  const handleFetchRoadmaps = async () => {
    try {
      const response = await axios.get(
        `${REST_API_BASE_URL}/admin/roadmap/${id}`
      );
      const roadmapData = response.data;
      setRoadmap(roadmapData);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };
  console.log(roadmap);
  useEffect(() => {
    handleFetchRoadmaps();
  }, []);
  return (
    <>
      <Back title="RoadMap" />

      <div className="container">
        <Heading subtitle={roadmap.title} title={roadmap.description} />
        <br />
        <Roadmap steps={roadmap.steps}/>
      </div>
    </>
  );
};



const ResourceModal = ({ show, onClose, step }) => {
  if (!show) {
    return null;
  }
console.log(step)
return (
  <div className="modal-overlay">
    <div className="modall-content">
      <button className="close-btn" onClick={onClose}>Close</button>
      <h1>{step.title}</h1>
      <p>{step.description}</p>
      {step.resources.length > 0 ? (
        <>
          <h2>Resources</h2>
          <ul>
            {step.resources.map((resource, index) => (
              <li key={index}>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  {index + 1} - {resource.title}
                </a>
                <br />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No Resources Added</p>
      )}
    </div>
  </div>
);
};

const Roadmap = ({ steps }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentResources, setCurrentResources] = useState([]);

  const handleOpenModal = (resources) => {
    setCurrentResources(resources);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentResources([]);
  };

  return (
    <div className="roadmap">
      <div className='coursesCard'>
        <div className='grid2'>
          {steps ? steps.map((val, index) => (
            <div className='items' key={index}>
              <div className='content flex'>
                <div className='left'>
                  <div></div>
                </div>
                <div className='text text-center'>
                  <h1>{index + 1} - {val.title}</h1>
                </div>
              </div>
              <div className='price'>
                <h3>
                  {/* Add price or other info here */}
                </h3>
              </div>
              <button className='outline-btn' onClick={() => handleOpenModal(val)}>
                <h4>Resources</h4>
              </button>
            </div>
          )) : ""}
        </div>
      </div>

      <ResourceModal show={showModal} onClose={handleCloseModal} step={currentResources} />
    </div>
  );
};

export default SelectRoadmap;

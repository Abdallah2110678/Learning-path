import axios from "axios";
import React, { useEffect, useState } from "react";
import { REST_API_BASE_URL } from "../../App";
import Back from "../common/back/Back";
import RoadmapsCard from "./RoadmapCard";
const RoadmapHome = () => {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    fetchRoadmaps();
    console.log(roadmaps);
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const response = await axios.get(`${REST_API_BASE_URL}/admin/roadmaps`);
      setRoadmaps(response.data);
      console.log(roadmaps);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
    }
  };
  const [searchQuery, setSearchQuery] = useState("");

  // const handleSearch = () => {
  //   if (searchQuery.trim() !== "") {
  //     axios
  //       .get(`${REST_API_BASE_URL}/student/search?title=${searchQuery}`)
  //       .then((response) => {
  //         setCourses(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching courses:", error);
  //       });
  //   }
  // };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     handleSearch();
  //   }
  // };
  return (
    <>
      <Back title="Explore Roadmaps" />
      <div className="container d-flex justify-content-center mt-5">
        <div className="row">
          <div className="col-md-8">
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              // onKeyPress={handleKeyPress}
              className="form-control"
              placeholder="Search by title..."
            />
          </div>
          <div className="col-md-4">

            <button onClick={fetchRoadmaps} className="btn btn-secondary">
              All Roadmaps
            </button>
          </div>
        </div>
      </div>
      <RoadmapsCard roadmaps={roadmaps} />
      {}
    </>
  );
};

export default RoadmapHome;

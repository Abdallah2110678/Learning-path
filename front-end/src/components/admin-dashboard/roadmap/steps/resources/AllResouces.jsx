import axios from "axios";
import { useEffect, useState } from "react";
import { REST_API_BASE_URL } from "../../../../../App";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";


 const AllResouces = () => {


  const { id } = useParams();
  const [roadmaps, setRoadmaps] = useState([]);
  const [roadmap, setRoadmap] = useState({});
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);


  const handleDelete = async (id,title) => {
    try {
      const response = await axios.delete(
        `${REST_API_BASE_URL}/admin/delete/resource/${id}`
      );

      if (response.status == 200) {
        setRoadmaps(prevRoadmaps => prevRoadmaps.filter(roadmap => roadmap.id !== id));
        setAlert("alert alert-success")
        setSuccessMessage(`${title} Deleted Successfully`);
        console.log("roadmap deleted successfully");
       
      } else {
        console.error("Failed to delete item");
        setAlert("alert alert-danger")
        setSuccessMessage(`Before Delete  check all Resources of (${title}) Deleted`);
      }
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  const handleCourseFetch = async () => {
    try {
      const response = await axios.get(`${REST_API_BASE_URL}/admin/step/${id}`);
      const roadmapData = response.data;
      setRoadmap(roadmapData)
      setRoadmaps(roadmapData.resources);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };
  console.log(roadmaps)

  useEffect(() => {
    handleCourseFetch();
  }, []);

  return (
    <div className={`main`}>
      <div className="topbar">
        <div className="toggle">
          <ion-icon name="menu-outline"></ion-icon>
        </div>
        <div className="search">
          <label>
            <input type="text" placeholder="Search here" />
            <ion-icon name="search-outline"></ion-icon>
          </label>
        </div>

        <div className="user">
          <img src="assets/imgs/customer01.jpg" alt="" />
        </div>
      </div>
      <div className="detailss ">
        <div className="recentOrderss">
        <div className="cardHeader">
            <h2>{roadmap.title}</h2>
            <Link to={`/admin/roadmaps`} className="btn">
              All Roadmaps
            </Link>
            </div>
          <div >
            
          <h2>All Resources</h2>
            <table className="table table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>

                  <th scope="col">URL</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roadmaps.length === 0 ? (
                  <tr>
                    <td colSpan="5">No Resources found</td>
                  </tr>
                ) : (
                  roadmaps.map((roadmap, index) => (
                    <tr key={roadmap.id}>
                      <td>{index + 1}</td>
                      <td> {roadmap.title}</td>
                      <td>
                        <a  target="_blank"
                          href={roadmap.url}
                          className="link-dark me-3"
                        >
                          {roadmap.url}
                        </a>
                      </td>
                      <td>
                        <Link
                          to={`/admin/course-edit/${roadmap.id}`}
                          className="link-dark me-3"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <button
                          className="btn"
                          onClick={() => handleDelete(roadmap.id,roadmap.title)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {successMessage && (
          <div className={alert}>{successMessage}</div>
        )}
        </div>
      </div>
    </div>
  );

//   const { id } = useParams();
//   const [selectedVideo, setSelectedVideo] = useState();
//   const [course, setCourse] = useState([{}]);
//   const [courseName, setCourseName] = useState("");

//   const handleDelete = async (idVideo) => {
//     try {
//       const response = await axios.delete(`${REST_API_BASE_URL}/instructor/${id}/material/${idVideo}`);

//       if (response.status === 200) {
//         // setSuccessMessage(`Instractor deleted successfully`);

//        // console.log("Instractor deleted successfully");
        
//        // setInstractor(Instractor.filter((Student) => Student.id !== id));
//       } else {
//         console.error("Failed to delete item");
//       }
//     } catch (error) {
//       console.error("Error deleting item:", error.message);
//     }
//   };

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const response = await axios.get(
//           `${REST_API_BASE_URL}/instructor/course/${id}`
//         );
//         setCourse(response.data.courseMaterials);
//         setCourseName(response.data.title);
//         console.log(response.data.courseMaterials);
//       } catch (error) {
//         console.error("Error fetching course:", error);
//       }
//     };

//     fetchCourse();
//   }, [id]);
//   // Function to handle video selection
//   const handleVideoSelect = (video) => {
//     setSelectedVideo(video);
//   };

//   return (
//     <div className={`main`}>
//       <div className="topbar">
//         <div className="toggle">
//           <ion-icon name="menu-outline"></ion-icon>
//         </div>
//         <div className="search">
//           <label>
//             <input type="text" placeholder="Search here" />
//             <ion-icon name="search-outline"></ion-icon>
//           </label>
//         </div>

//         <div className="user">
//           <img src="assets/imgs/customer01.jpg" alt="" />
//         </div>
//       </div>
//       <div className="detailss ">
//         <div className="recentOrderss">
//           <div style={{ padding: "5px" }}>
//             {/* Your message alert */}
//             <Link to="/admin/createcourse" className="btn btn-dark mb-3">
//               Add New
//             </Link>

//             <div>
//               <h1>{courseName}</h1>
//               <div style={{ display: "flex" }}>
//                 <div style={{ flex: 2 }}>
//                   {/* Left side - Display selected video */}

//                   {selectedVideo && (
//                     <video controls width="400" height="300">
//                       <source
//                         src={`${REST_API_BASE_URL}/instructor/play/${id}/${selectedVideo}`}
//                       />
//                     </video>
//                   )}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   {/* Right side - Table of videos */}

//                   <table className="table table-hover text-center">
//                     <thead className="table-dark">
//                       <tr>
//                         <th>ID</th>
//                         <th>Title</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {course.length === 0 ? (
//                         <tr>
//                           <td colSpan="6">Videos not found</td>
//                         </tr>
//                       ) : (
//                         course.map((video, index) => (
//                           <tr key={video.id}>
//                             <td>{index + 1}</td>
//                             <td>{video.title}</td>
//                             <td>
//                               {/* Button to select video */}
                              
//                               <button className="btn"
//                           onClick={() => handleVideoSelect(video.id)}>
//                           <FontAwesomeIcon icon={faEye} />
//                             </button>
//                             <button className="btn"
//                           onClick={() => handleDelete(video.id)}>
//                           <FontAwesomeIcon icon={faTrash} />
//                         </button>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* {successMessage && (
//         <div className="alert alert-success">{successMessage}</div>
//       )}*/}
//         </div>
//       </div>
//     </div>
//   );
// };

// //     const GetAllVideo =()=>{
// //         return axios.get(`${REST_API_BASE_URL}/instructor`);
//     }

//     const [data,setData] =useState([]);
//     const [loading,setLoading] = useState(false);
//     const getAllFile = async ()=>
//     {
//         try {
//             const response=await GetAllVideo();
//         setData(response.data);
//         setLoading(true);

//         } catch (error) {
//             alert(error.message)
//             console.log(error);

//         }
//     }

//     useEffect(()=>{
//         getAllFile();
//     },[])

//     return (
//         <>
//         <Container>

//                 <video controls>
//                     <source src={`${REST_API_BASE_URL}/instructor/play/1/1`}>
//                     </source>
//                 </video>

//         </Container>
//         </>
//     )
// }
 }
export default AllResouces;

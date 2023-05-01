import "./card.css";
import data from "./data/Vendors";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from "react";

export default function App() {
  const [searchItems, setSearch] = useState("");
  const [options, setOptions] = useState("location");
  const [showImage, setShowImage] = useState(-1);

  const filterSearch = data.filter((vendor) => {
    let isOptions = "";
    switch (options) {
      case "name":
        isOptions = vendor.vendor.details.name;
        break;
      case "age":
        isOptions = vendor.vendor.details.age;
        break;
      case "location":
        isOptions = vendor.vendor.details.location;
        break;
      default:
        console.log("Invalid option selected");
        break;
    }
    if (isOptions !== "") {
      const searchString = `${isOptions}`.toLowerCase();
      return searchString.includes(searchItems.toLowerCase());
    }
    return true;
  });

  return (
    <div className="App">
      <div className="container p-5 bg-warning">
        <label> Search by Name, Location and Age</label>
        <input
          className="form-control"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <select
          className="form-select mt-2"
          onChange={(e) => {
            setOptions(e.target.value);
          }}
        >
          <option value="location">By Location</option>
          <option value="name">By Name</option>
          <option value="age">By Age</option>
        </select>
      </div>
      <div className="row">
        {filterSearch.length > 0 ? (
          filterSearch.map((vendor, index) => (
            <div className="card1" key={index} id={index}>
              <img
                src={vendor.vendor.details.img}
                alt={"user"}
                className="card-image1"
                onClick={()=>{setShowImage(-index)}
              />
              <div className="card-details1">
                <h2>{vendor.vendor.details.name}</h2>
                <p>{vendor.vendor.details.age}</p>
              </div>
              {showImage ==index && (
                <div
                  className="full-screen-overlay"
                  onClick={() => {
                    setShowImage(false);
                  }}
                  id={index}
                >
                  <img
                    src={vendor.vendor.details.img}
                    alt={vendor.vendor.details.name}
                    className="full-screen-image"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

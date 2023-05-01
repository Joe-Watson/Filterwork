import "./Vender.css";
import { BsFillPersonFill } from "react-icons/bs";
import { useDetails } from "../../../Hooks/useDetails";
import { useEffect, useState } from "react";
import Template from "./Template";
import Spinner from "../../../Spinner/Spinner";

const Vendors = () => {
  //Using Hooks
  const { vendors, loading, error } = useDetails("venders");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter vendors by name, email or location
  const filteredVendors = vendors?.filter((vendor) => {
    const { Name, Email, Location } = vendor.Details;
    const searchString = `${Name} ${Email} ${Location}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    setSearchTerm("");
  }, [loading]);

  return (
    <div className="use_container  p-5">
      <div className="mb-4">
        <label htmlFor="search" className="form-label">
          Search by Name, Email or Location
        </label>
        <input
          type="text"
          className="form-control"
          id="search"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error ? (
        <p className="bg-danger text-white p-2">Something Went Wrong</p>
      ) : filteredVendors && filteredVendors.length > 0 ? (
        filteredVendors.map((vendor) =>
          vendor.vendors.map((data) => (
            <Template
              key={data.id}
              name={data.vendor.Details.Name}
              email={data.vendor.Details.Email}
              location={data.vendor.Details.Location}
              phone={data.vendor.Details.Phone}
              Aadhar={
                data.vendor.AadharCar !== null &&
                data.vendor.AadharCar.approve !== false
              }
              Pan={
                data.vendor.PanCar !== null &&
                data.vendor.PanCar.approve !== false
              }
              GST={
                data.vendor.GST !== null && data.vendor.GST.approve !== false
              }
              Shop={
                data.vendor.Shop !== null && data.vendor.Shop.approve !== false
              }
              Contract={
                data.vendor.Contract !== null &&
                data.vendor.Contract.approve !== false
              }
              Img={
                data.vendor.AadharCar !== null && data.vendor.AadharCar.front
              }
              AadharFront={data.vendor.AadharCar?.front}
              AadharBack={data.vendor.AadharCar?.back}
              PanBack={data.vendor.PanCar?.back}
              PanFront={data.vendor.PanCar?.front}
              GSTPdf={data.vendor.PanCar?.pdf}
              ContractPdf={data.vendor.Contract?.contract}
              allDocs={
                data.vendor.AadharCar !== null ||
                data.vendor.PanCar !== null ||
                data.vendor.GST !== null ||
                data.vendor.Shop !== null ||
                data.vendor.Contract !== null
              }
            />
          ))
        )
      ) : (
        <p>No vendors found</p>
      )}

      {error ? (
        ""
      ) : (
        <button
          className="btn btn-primary mt-5"
          disabled={loading ? true : false}
        >
          {loading ? <Spinner /> : "Load more"}
        </button>
      )}
    </div>
  );
};

export default Vendors;

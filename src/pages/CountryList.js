import React, { useEffect, useState } from "react";
import * as servicesCountries from "../services/countries";

export default function CountryList() {
  let rowSize = 10;
  const [data, setdata] = useState([]);
  const [list, setlist] = useState([]);
  const [selectedPage, setselectedPage] = useState(0);

  const [globalFilter, setglobalFilter] = useState("");

  const [nameFilter, setNamefilter] = useState("");
  const [capitalFilter, setcapitalfilter] = useState("");
  const [regionFilter, setregionfilter] = useState("");

  useEffect(() => {
    servicesCountries.countries().then((responseData) => {
      let newList = responseData?.data.map((item) => ({
        name: item.name,
        capital: item.capital,
        flag: item.flag,
        region: item.region,
      }));

      setdata(newList || []);
    });
  }, []);

  useEffect(() => {
    let filterdata = data.filter(
      (item) =>
        (item?.name?.toLowerCase().includes(globalFilter.toLowerCase()) ||
          item?.capital?.toLowerCase().includes(globalFilter.toLowerCase()) ||
          item?.region?.toLowerCase().includes(globalFilter.toLowerCase())) &&
        item?.name?.toLowerCase().includes(nameFilter.toLowerCase()) &&
        item?.capital?.toLowerCase().includes(capitalFilter.toLowerCase()) &&
        item?.region?.toLowerCase().includes(regionFilter.toLowerCase())
    );
    setselectedPage(0);
    setlist(filterdata || []);
  }, [globalFilter, data, nameFilter, capitalFilter, regionFilter]);

  return (
    <div className="CountryList container-fluid">
      <h2> Country List : {list.length}</h2>
      <div className="row">
        <div className="col-sm-12 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3>Filter</h3>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Global</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  value={globalFilter}
                  onChange={(e) => {
                    setglobalFilter(e.target.value);
                  }}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Capital</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setcapitalfilter(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-8">
          <table className="table table-striped table-hover">
            <thead className="thead-light">
              <tr>
                <th>Flag</th>
                <th>Name</th>
                <th>Capital</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              {list
                .slice(selectedPage * rowSize, (selectedPage + 1) * rowSize)
                .map((item, index) => (
                  <tr key={selectedPage * rowSize + index}>
                    <td>
                      <img src={item.flag} width="50" />
                    </td>
                    <th>{item.name}</th>
                    <td>{item.capital}</td>
                    <td>{item.region}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-sm-12 ">
          <nav aria-label="Page navigation example">
            <ul className="pagination float-right">
              <li className={`page-item ${selectedPage == 0 && "disabled"}`}>
                <a
                  className="page-link"
                  href="#"
                  onClick={() => {
                    setselectedPage((prew) => prew - 1);
                  }}
                >
                  Previous
                </a>
              </li>

              {[...Array(Math.ceil(list.length / rowSize)).keys()].map(
                (item) => (
                  <li
                    className={`page-item     ${
                      selectedPage == item && "active"
                    }`}
                    onClick={() => {
                      setselectedPage(item);
                    }}
                  >
                    <a className="page-link" href="#">
                      {item + 1}
                    </a>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  selectedPage + 1 == Math.ceil(list.length / rowSize) &&
                  "disabled"
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => {
                    setselectedPage((prew) => prew + 1);
                  }}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

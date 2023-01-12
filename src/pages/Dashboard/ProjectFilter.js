import { useState } from "react";

// MUI Components
import { MDBContainer, MDBBtn } from "mdb-react-ui-kit";

const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
];

export default function ProjectFilter({ changeFilter }) {
  const [currentFilter, setCurrentFilter] = useState("all");

  const handleClick = (newFilter) => {
    setCurrentFilter(newFilter);
    changeFilter(newFilter);
  };

  return (
    // <div className="project-filter">
    <MDBContainer
      fluid
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <h4>Filter by: </h4>
      {filterList.map((f) => (
        <MDBBtn
          variant="outline-primary"
          key={f}
          onClick={() => handleClick(f)}
          className={currentFilter === f ? "active m-1" : "m-1"}
        >
          {f}
        </MDBBtn>
      ))}
    </MDBContainer>
    // </div>
  );
}

import { useState } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

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
    <div className="project-filter">
      <Container
        fluid
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <h4>Filter by: </h4>
        {filterList.map((f) => (
          <Button
            variant="outline-primary"
            key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? "active m-1" : "m-1"}
          >
            {f}
          </Button>
        ))}
      </Container>
    </div>
  );
}

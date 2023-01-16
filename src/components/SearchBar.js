import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SearchBar() {
  return (
    <Form className="d-flex" id="bar-and-button">
      <Form.Control
        type="search"
        placeholder="Search a Hero"
        className="input-bar"
        aria-label="Search"
      />
      <Button variant="outline-success" className="search-button">
        Go
      </Button>
    </Form>
  );
}
export default SearchBar;

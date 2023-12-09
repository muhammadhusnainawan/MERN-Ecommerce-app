import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <Spinner
      animation="border"
      style={{
        width: 100,
        height: 100,
        margin: "auto",
        display: "block",
      }}
    />
  );
}

export default Loader;

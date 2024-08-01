import Row from "react-bootstrap/Row";

export default function Header() {
  return (
    <>
      <Row>
        <a className="navbar-brand" href="/" id="title-text">
          vidly
        </a>
      </Row>
      <Row>
        <div className="cover-poster-item">
          <img
            src="https://images.unsplash.com/photo-1655057011043-158c48f3809d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="vidly-cover-poster"
          />
          <div className="cover-poster-text">
            Let's <br />
            <span></span>
          </div>
        </div>
      </Row>
    </>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { GrEdit, GrPlay, GrSearch, GrView } from "react-icons/gr";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import Footer from "./footer";
import Header from "./header";
import Nav from "./nav";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Home() {
  const validationschema = Yup.object().shape({
    name: Yup.string().required("Title is required*"),
    releasedyear: Yup.string().required("Released Year is required*"),
    genre: Yup.string().required("Genre is required*"),
    director: Yup.string().required("Director is required*"),
    language: Yup.string().required("Language is required*"),
    distribute: Yup.string().required("Distributed Company is required*"),
    time: Yup.number().required("Duration is required*"),
    storyline: Yup.string().required("Story line is required*"),
    posterImg: Yup.string().required("Poster Image is required*"),
    movieurl: Yup.string().required("Movie Trailer URL is required*"),
  });

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({
    name: "",
    genre: "",
    director: "",
    language: "",
    distribute: "",
    time: "",
    posterImg: "",
    storyline: "",
    releasedyear: "",
    movieurl: "",
  });
  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (movie) => {
    setSelectedMovie(movie);
    setShow(true);
  };
  const handleUpdateClose = () => {
    setUpdateShow(false);
  };

  const handleUpdateShow = (movie) => {
    setSelectedMovie(movie);
    setUpdateShow(true);
  };

  const loadMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8050/movie/movies");
      setMovies(response.data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error while fetching movies!",
        icon: "error",
      });
    }
  };
  useEffect(() => {
    loadMovies();
  }, []);

  const resetPage = async () => {
    await loadMovies();
  };

  const deletemovie = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8050/movie/movie/delete/${id}`);
          Swal.fire({
            title: "Deleted",
            text: "Selected movie has been deleted!",
            icon: "success",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await resetPage();
            }
          });
        } catch (err) {
          Swal.fire({
            title: "Error",
            text: "Error while deleting movie!",
            icon: "error",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Selected movie is safe!",
          icon: "error",
        });
      }
    });
  };

  const handleWatchMovie = (movie) => {
    let isTrueMovie = movie.movieurl;
    if (Boolean(isTrueMovie).valueOf() === true) {
      Swal.fire({
        title: "Please Wait",
        text: "Selected movie is loading!",
        icon: "info",
      });
      window.location.replace(movie.movieurl);
    } else {
      Swal.fire({
        title: "Try Again Later",
        text: "Selected movie can't find!",
        icon: "warning",
      });
    }
  };

  const onSubmit = async (values) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `http://localhost:8050/movie/movie/update/${selectedMovie._id}`,
            values
          );
          Swal.fire({
            title: "Saved & Updated",
            text: "Selected movie has been updated!",
            icon: "success",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await resetPage();
              setUpdateShow(false);
            }
          });
        } catch (err) {
          Swal.fire({
            title: "Try Again",
            text: "Something went wrong!",
            icon: "warning",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Selected movie is safe!",
          icon: "error",
        });
      }
    });
  };

  const renderError = (message) => (
    <p className="text-danger fw-normal">{message}</p>
  );
  const [results, setResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    if (searchInput === "") {
      setResults(movies);
      setMessage("");
    } else {
      let results = movies.filter(
        (movie) =>
          movie.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchInput.toLowerCase()) ||
          movie.releasedyear
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          movie.language.toLowerCase().includes(searchInput.toLowerCase())
      );
      setResults(results);
      if (results.length === 0) {
        setMessage("No Matching Results");
      } else {
        setMessage("");
      }
    }
  };

  useEffect(() => {
    setResults(movies);
  }, [movies]);

  const refreshMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:8050/movie/movies`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    refreshMovies();
  }, []);
  return (
    <div className="App-movie">
      <Container>
        <Row md={12}>
          <Header />
        </Row>
        <Container fluid id="title-section">
          <Row md={12}>
            <p className="navbar-brand" id="subtitle-text">
              Movie Collection
            </p>
          </Row>
          <Row md={12}>
            <Col md={10}>
              <Col className="search-bar">
                <input
                  className="form-control me-2"
                  id="search-text-box"
                  type="search"
                  placeholder="Search movies by title, language, genre and released year"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <OverlayTrigger
                  overlay={
                    <Tooltip id="tooltip-disabled">
                      Search Movie Details
                    </Tooltip>
                  }
                >
                  <span className="d-inline-block">
                    <span
                      className="input-group-text"
                      id="search-addon"
                      style={{ cursor: "pointer" }}
                      onClick={handleSearch}
                    >
                      <GrSearch /> Search Movie
                    </span>
                  </span>
                </OverlayTrigger>
              </Col>
            </Col>
            <Col md={2}>
              <Nav refreshMovies={refreshMovies} />
            </Col>
          </Row>

          <br />
          {/* Movie list */}
          <Row md={12}>
            {message && (
              <h1 className="message">
                {message} <RiEmotionUnhappyLine />
              </h1>
            )}
            {results.map((movie, _id) => (
              <Col key={movie.id} md={3}>
                <Card className="item-feature-card">
                  <Card.Img
                    variant="top"
                    src={movie.posterImg}
                    className="item-feature-image"
                  />
                  <Card.Body className="item-feature-card-body">
                    <Card.Title id="item-feature-title">
                      {movie.name}({movie.releasedyear})
                    </Card.Title>
                    <Card.Text className="text-start">
                      <span className="item-feature-key">Genre : </span>
                      <span className="text-capitalize" id="item-feature-value">
                        {movie.genre}
                      </span>
                    </Card.Text>
                    <Card.Text className="text-start">
                      <span className="item-feature-key">Language : </span>
                      <span className="text-capitalize" id="item-feature-value">
                        {movie.language}
                      </span>
                    </Card.Text>
                    <Card.Text className="text-start">
                      <span className="item-feature-key">Duration : </span>
                      <span className="text-capitalize" id="item-feature-value">
                        {movie.time} minutes
                      </span>
                    </Card.Text>

                    <div className="d-grid gap-2">
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            View Movie Details
                          </Tooltip>
                        }
                      >
                        <Button
                          variant="primary"
                          onClick={() => handleShow(movie)}
                          size="sm"
                          style={{ MouseEvent: "none" }}
                        >
                          <GrView /> View
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            Update Movie Details
                          </Tooltip>
                        }
                      >
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleUpdateShow(movie)}
                          style={{ MouseEvent: "none" }}
                        >
                          <GrEdit /> Update
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="tooltip-disabled">Delete Movie</Tooltip>
                        }
                      >
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deletemovie(movie._id)}
                          style={{ MouseEvent: "none" }}
                        >
                          <MdDelete /> Delete
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            Watch Official Trailer
                          </Tooltip>
                        }
                      >
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleWatchMovie(movie)}
                          style={{ MouseEvent: "none" }}
                        >
                          <GrPlay /> Official Trailer
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        <br />
        <hr className="section-divider" />
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>

      {/* View details modal */}
      {
        <Modal show={show} onHide={handleClose}>
          <Modal.Header id="view-detail-modal-header">
            <Modal.Title id="item-feature-title">
              {selectedMovie.name}({selectedMovie.releasedyear})
            </Modal.Title>
            <br />
          </Modal.Header>
          <Image src={selectedMovie.posterImg} id="view-detail-modal-body" />
          <Modal.Body id="view-detail-modal-body">
            <Form method="POST">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="item-feature-key">
                  Movie Title * |
                </Form.Label>
                <Form.Control
                  type="text"
                  value={selectedMovie.name}
                  className="text-capitalize"
                  id="item-feature-value"
                  disabled
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label className="item-feature-key">
                  Released Year * |
                </Form.Label>
                <Form.Control
                  type="text"
                  value={selectedMovie.releasedyear}
                  className="text-capitalize"
                  id="item-feature-value"
                  disabled
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label className="item-feature-key">Genre * |</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedMovie.genre}
                  className="text-capitalize"
                  id="item-feature-value"
                  disabled
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput4"
              >
                <Form.Label className="item-feature-key">
                  Director * |
                </Form.Label>
                <Form.Control
                  type="text"
                  value={selectedMovie.director}
                  className="text-capitalize"
                  id="item-feature-value"
                  disabled
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput5"
              >
                <Form.Label className="item-feature-key">
                  Language * |
                </Form.Label>
                <Form.Control
                  type="text"
                  value={selectedMovie.language}
                  className="text-capitalize"
                  id="item-feature-value"
                  disabled
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput6"
              >
                <Form.Label className="item-feature-key">
                  Distributed By * |
                </Form.Label>
                <Form.Control
                  type="text"
                  value={selectedMovie.distribute}
                  className="text-capitalize"
                  id="item-feature-value"
                  disabled
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput7"
              >
                <Form.Label className="item-feature-key">
                  Duration (Minutes) * |
                </Form.Label>
                <Form.Control
                  type="text"
                  value={selectedMovie.time}
                  className="text-capitalize"
                  id="item-feature-value"
                  disabled
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea8"
              >
                <Form.Label className="item-feature-key">
                  Storyline * |
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={selectedMovie.storyline}
                  className="text-capitalize"
                  id="item-feature-value"
                  disabled
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer id="view-detail-modal-footer">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      }

      {/* update details modal */}
      {
        <Modal show={updateShow} onHide={handleUpdateClose}>
          <Modal.Header id="view-detail-modal-header">
            <Modal.Title id="item-feature-title">
              Update movie deatils
            </Modal.Title>
            <br />
          </Modal.Header>
          <Modal.Body id="view-detail-modal-body">
            <Container>
              <Formik
                initialValues={selectedMovie}
                enableReinitialize
                validationSchema={validationschema}
                onSubmit={onSubmit}
              >
                {() => (
                  <FormikForm>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label className="item-feature-key">
                          Movie Title * |
                        </label>
                        <div className="input-group">
                          <Field
                            type="text"
                            className="form-control"
                            id="item-feature-value"
                            name="name"
                            placeholder="Enter title of the movie"
                            autoFocus
                          />
                        </div>
                        <div className="form-text" id="basic-addon4">
                          <ErrorMessage name="name" render={renderError} />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label className="item-feature-key">
                          Released Year * |
                        </label>
                        <div className="input-group">
                          <Field
                            type="text"
                            className="form-control"
                            id="item-feature-value"
                            name="releasedyear"
                            placeholder="Enter released year of the movie"
                            autoFocus
                          />
                        </div>
                        <div className="form-text" id="basic-addon4">
                          <ErrorMessage
                            name="releasedyear"
                            render={renderError}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label className="item-feature-key">Genre * |</label>
                        <div className="input-group">
                          <Field
                            type="text"
                            className="form-control"
                            id="item-feature-value"
                            name="genre"
                            autoFocus
                          />
                        </div>
                        <div className="form-text" id="basic-addon4">
                          <ErrorMessage name="genre" render={renderError} />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label className="item-feature-key">Director * |</label>
                        <div className="input-group">
                          <Field
                            type="text"
                            className="form-control"
                            id="item-feature-value"
                            name="director"
                            autoFocus
                          />
                        </div>
                        <div className="form-text" id="basic-addon4">
                          <ErrorMessage name="director" render={renderError} />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label className="item-feature-key">Language * |</label>
                        <div className="input-group">
                          <Field
                            type="text"
                            className="form-control"
                            id="item-feature-value"
                            name="language"
                            autoFocus
                          />
                        </div>
                        <div className="form-text" id="basic-addon4">
                          <ErrorMessage name="language" render={renderError} />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label className="item-feature-key">
                          Distributed By * |
                        </label>
                        <div className="input-group">
                          <Field
                            type="text"
                            className="form-control"
                            id="item-feature-value"
                            name="distribute"
                            autoFocus
                          />
                        </div>
                        <div className="form-text" id="basic-addon4">
                          <ErrorMessage
                            name="distribute"
                            render={renderError}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label className="item-feature-key">
                          Duration (Minutes) * |
                        </label>
                        <div className="input-group">
                          <Field
                            type="number"
                            className="form-control"
                            id="item-feature-value"
                            name="time"
                            autoFocus
                          />
                        </div>
                        <div className="form-text" id="basic-addon4">
                          <ErrorMessage name="time" render={renderError} />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label className="item-feature-key">
                          Storyline * |
                        </label>
                        <div className="input-group">
                          <Field
                            as="textarea"
                            className="form-control"
                            name="storyline"
                            placeholder="Enter storyline of the movie"
                            id="item-feature-value"
                            style={{ height: "150px" }}
                            autoFocus
                          ></Field>
                        </div>
                        <div className="form-text" id="basic-addon4">
                          <ErrorMessage name="storyline" render={renderError} />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label className="item-feature-key">
                          Movie Poster URL * |
                        </label>
                        <div className="input-group">
                          <Field
                            type="text"
                            className="form-control"
                            name="posterImg"
                            placeholder="Enter poster URL of the movie"
                            id="item-feature-value"
                            autoFocus
                          />
                        </div>
                        <div className="form-text" id="basic-addon4">
                          <ErrorMessage name="posterImg" render={renderError} />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label className="item-feature-key">
                          Movie Trailer URL * |
                        </label>
                        <div className="input-group">
                          <Field
                            type="text"
                            className="form-control"
                            id="item-feature-value"
                            name="movieurl"
                            placeholder="Enter URL of the movie"
                            autoFocus
                          />
                        </div>
                        <div className="form-text" id="basic-addon4">
                          <ErrorMessage name="movieurl" render={renderError} />
                        </div>
                      </div>
                    </div>
                    <Modal.Footer id="view-detail-modal-footer">
                      <Button variant="success" type="submit">
                        Update and Save
                      </Button>
                      <Button variant="secondary" onClick={handleUpdateClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </FormikForm>
                )}
              </Formik>
            </Container>
          </Modal.Body>
        </Modal>
      }
    </div>
  );
}

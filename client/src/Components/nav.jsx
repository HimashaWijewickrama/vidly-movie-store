import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default function Nav({ refreshMovies }) {
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

  const initialValues = {
    name: "",
    releasedyear: "",
    genre: "",
    director: "",
    language: "",
    distribute: "",
    time: "",
    storyline: "",
    posterImg: "",
    movieurl: "",
  };

  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const sendData = async (values) => {
    const newMovie = {
      name: values.name,
      genre: values.genre,
      director: values.director,
      language: values.language,
      distribute: values.distribute,
      time: values.time,
      posterImg: values.posterImg,
      storyline: values.storyline,
      releasedyear: values.releasedyear,
      movieurl: values.movieurl,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "Cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(`http://localhost:8050/movie/movie/add`, newMovie);
          Swal.fire({
            title: "Saved",
            text: "Selected movie has been saved!",
            icon: "success",
          }).then(async (result) => {
            if (result.isConfirmed) {
              setShowModal(false);
              refreshMovies();
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
          text: "Selected movie is not saved!",
          icon: "error",
        });
      }
    });
  };

  const renderError = (message) => (
    <p className="text-danger fw-normal">{message}</p>
  );

  return (
    <>
      <Container fluid>
        <Col className="add-button">
          <div className="d-grid gap-2">
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="tooltip-disabled">
                  Add Details of a New Movie
                </Tooltip>
              }
            >
              <span className="d-inline-block">
                <Button
                  variant="light"
                  onClick={() => handleModalShow()}
                  style={{ MouseEvent: "none" }}
                  size="lg"
                  id="add-button-addon"
                >
                  <GrAdd /> Add Movie
                </Button>
              </span>
            </OverlayTrigger>
          </div>
        </Col>
      </Container>
      {/* Add details modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header id="view-detail-modal-header">
          <Modal.Title
            className="text-center text-capitalize"
            id="item-feature-title"
          >
            Enter movie details
          </Modal.Title>
          <br />
        </Modal.Header>
        <Modal.Body id="view-detail-modal-body">
          <Formik
            initialValues={initialValues}
            validationSchema={validationschema}
            onSubmit={sendData}
            enableReinitialize
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="mb-3">
                    <label className="item-feature-key">Movie Title * |</label>
                    <div className="input-group">
                      <Field
                        type="text"
                        className="form-control specific-input"
                        aria-describedby="basic-addon3 basic-addon4"
                        name="name"
                        placeholder="Enter title of the movie"
                        id="item-feature-value"
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
                        className="form-control specific-input"
                        aria-describedby="basic-addon3 basic-addon4"
                        name="releasedyear"
                        placeholder="Enter released year of the movie"
                        id="item-feature-value"
                        autoFocus
                      />
                    </div>
                    <div className="form-text" id="basic-addon4">
                      <ErrorMessage name="releasedyear" render={renderError} />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="mb-3">
                    <label className="item-feature-key">Genre * |</label>
                    <div className="input-group">
                      <Field
                        type="text"
                        className="form-control specific-input"
                        aria-describedby="basic-addon3 basic-addon4"
                        name="genre"
                        placeholder="Enter genre of the movie"
                        id="item-feature-value"
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
                        className="form-control specific-input"
                        aria-describedby="basic-addon3 basic-addon4"
                        name="director"
                        placeholder="Enter director of the movie"
                        id="item-feature-value"
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
                        className="form-control specific-input"
                        aria-describedby="basic-addon3 basic-addon4"
                        name="language"
                        placeholder="Enter language of the movie"
                        id="item-feature-value"
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
                        className="form-control specific-input"
                        aria-describedby="basic-addon3 basic-addon4"
                        name="distribute"
                        placeholder="Enter distributed company of the movie"
                        id="item-feature-value"
                        autoFocus
                      />
                    </div>
                    <div className="form-text" id="basic-addon4">
                      <ErrorMessage name="distribute" render={renderError} />
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
                        className="form-control specific-input"
                        aria-describedby="basic-addon3 basic-addon4"
                        name="time"
                        placeholder="Enter time duration of the movie"
                        id="item-feature-value"
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
                    <label className="item-feature-key">Storyline * |</label>
                    <div className="input-group">
                      <Field
                        as="textarea"
                        className="form-control specific-input"
                        aria-describedby="basic-addon3 basic-addon4"
                        name="storyline"
                        placeholder="Enter storyline of the movie"
                        id="item-feature-value"
                        style={{ height: "100px" }}
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
                        className="form-control specific-input"
                        aria-describedby="basic-addon3 basic-addon4"
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
                    <div className="input-group" id="input-group-text">
                      <Field
                        type="text"
                        className="form-control specific-input"
                        aria-describedby="basic-addon3 basic-addon4"
                        name="movieurl"
                        placeholder="Enter URL of the movie"
                        id="item-feature-value"
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
                    Add and Save
                  </Button>
                  <Button variant="secondary" onClick={handleModalClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

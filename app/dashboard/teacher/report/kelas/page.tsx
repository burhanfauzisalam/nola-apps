"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { Modal, Button, Form } from "react-bootstrap";
import Cookies from "js-cookie";

const KelasPage = () => {
  const [data, setData]: any = useState([]);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newClass, setNewClass] = useState({
    subject: "",
    grade: 0,
    schoolYear: "2024/2025",
    students: [],
  });

  const session: any = Cookies.get("token");
  const sessionParse = JSON.parse(session ? session : null);
  const token = sessionParse?.token;
  const [user, setUser]: any = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_EX}/subjects`
        );
        setData(res.data);
      } catch (error: any) {
        alert(error.response.data.message);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    try {
      const getData = async () => {
        const teacher = await axios.get(
          `${process.env.NEXT_PUBLIC_API_EX}/teacher`,
          { headers: { token } }
        );
        setUser(teacher.data);
        // console.log(user);
      };
      getData();
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }, []);

  const handleEdit = (id: string) => {
    console.log(`Edit item with id: ${id}`);
  };

  const handleDelete = async (id: string) => {
    const deleteSubject = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_EX}/subject?id=${id}`
    );
    alert(deleteSubject.data.message);
    const newData = data.filter((item: any) => item._id !== id);
    setData(newData);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewClass((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const newClassData = { ...newClass, teacher: user?.name };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_EX}/subject`,
        newClassData
      );
      // console.log(newClassData);
      const newData = [res.data, ...data].sort((a, b) => {
        if (a.subject < b.subject) {
          return -1;
        }
        if (a.subject > b.subject) {
          return 1;
        }
        return 0;
      });
      setData(newData);
      handleCloseModal();
    } catch (error: any) {
      alert(error.response.data.message);
      handleCloseModal();
    }
  };

  const filteredData = data?.filter(
    (item: any) =>
      item.subject.toLowerCase().includes(filter.toLowerCase()) ||
      item.schoolYear.includes(filter) ||
      item.teacher.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <Button
        className="btn btn-info p-2 mb-2 text-white"
        onClick={handleShowModal}
      >
        <strong>&#x2b; </strong>Tambah Kelas
      </Button>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="&#x1F50D; Filter subjects, school year, or teacher"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>School Year</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Teacher</th>
            <th>Students</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item: any) => (
            <tr key={item._id}>
              <td>{item.schoolYear}</td>
              <td>{item.subject}</td>
              <td>{item.grade}</td>
              <td>{item.teacher}</td>
              <td>{item.students.length}</td>
              <td>
                <Button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(item._id)}
                >
                  <BsPencilSquare />
                </Button>
                <Button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item._id)}
                >
                  <MdDeleteForever />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kelas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject"
                name="subject"
                value={newClass.subject}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGrade">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter grade"
                name="grade"
                value={newClass.grade}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSchoolYear">
              <Form.Label>School Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter school year"
                name="schoolYear"
                value={newClass.schoolYear}
                onChange={handleChange}
                required
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTeacher">
              <Form.Label>Teacher</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter teacher's name"
                name="teacher"
                value={user?.name}
                onChange={handleChange}
                required
                disabled
              />
            </Form.Group>

            {newClass.subject && newClass.grade > 0 && user?.name && (
              <Button variant="primary" type="submit">
                Submit
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default KelasPage;

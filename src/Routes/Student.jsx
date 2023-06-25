// TODO: answer here
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Select, Table, Button, Td, Tr, Th, Tbody, Thead} from "@chakra-ui/react";

const Student = () => {
    // TODO: answer here
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3001/student");
            const data = await response.json();
            setStudents(data);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching data: ", error);
            setLoading(false);
        }
    }

    const handleDel = async (id) => {
        try {
            await fetch(`http://localhost:3001/student/${id}`, {
                method: "DELETE",
            });
            fetchData();
        } catch (error) {
            console.log("Error deleting data: ", error);
        }
    }

    const handleFilter = (e) => {
        setFilter(e.target.value);
    }

    const filteredStudents = filter === "All" ? students : students.filter((s) => s.faculty === filter);

    return (
        <>
            {/* TODO: answer here */}
            <div className="student-data">
                <div>
                    <h1>Student List</h1>
                    <Select 
                        value={filter}
                        onChange={handleFilter}
                        data-testid="filter"
                    >
                        <option value="All">All</option>
                        <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                        <option value="Fakultas Ilmu Sosial dan Politik">Fakultas Ilmu Sosial dan Politik</option>
                        <option value="Fakultas Teknik">Fakultas Teknik</option>
                        <option value="Fakultas Teknologi Informasi dan Sains">Fakultas Teknologi Informasi dan Sains</option>
                    </Select>
                </div>
                {loading ? (
                    <p>Loading ...</p>
                ):(
                    <Table id="table-student">
                        <Thead>
                            <Tr>
                                <Th>No</Th>
                                <Th>Full Name</Th>
                                <Th>Faculty</Th>
                                <Th>Program Study</Th>
                                <Th>Option</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredStudents.map((student, index) => (
                                <Tr key={student.id} className="student-data-row" >
                                    <Td data-label="No">{index + 1}</Td>
                                    <Td data-label="Full Name">
                                        <Link to={`/student/${student.id}`}>
                                            {student.fullname}
                                        </Link>
                                    </Td>
                                    <Td data-label="Faculty">{student.faculty}</Td>
                                    <Td data-label="Program Study">{student.programStudy}</Td>
                                    <Td data-label="Option">
                                        <Button onClick={() => handleDel(student.id)} data-testid={`delete-${student.id}`} id="del-btn">
                                            Delete
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                )}
            </div>
        </>
    );
};

export default Student;

// TODO: answer here
import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Input, Button, Select} from "@chakra-ui/react";

const AddStudent = () => {
    // TODO: answer here
    const nav = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        fullname: "",
        profilePicture: "",
        address: "",
        phoneNumber: "",
        birthDate: "",
        gender: "",
        programStudy: "",
    });

    useEffect(() => {
        fetch(`http://localhost:3001/student`) //?????
            .then((response) => response.json())
            .then((data) => {
                setFormData(data);
            })
            .catch((error) => {
                console.log("Error fetching data: ", error);
            }
        );
    }, [id]);

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

        const handleSubmit = async (event) => {
            event.preventDefault();
    
            const {
                fullname,
                profilePicture,
                address,
                phoneNumber,
                birthDate,
                gender,
                programStudy,
            } = formData;
    
            const faculty = getFaculty(programStudy);
    
            const newStudent = {
                fullname,
                profilePicture,
                address,
                phoneNumber,
                birthDate,
                gender,
                faculty,
                programStudy,
            };
    
            fetch(`http://localhost:3001/student`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newStudent),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success: ", data);
                    nav("/student");
                })
                .catch((error) => {
                    console.log("Error: ", error);
                });
        };
    
        const getFaculty = (programStudy) => {
            let faculty = "";
    
            switch (programStudy) {
                case "Ekonomi":
                case "Manajemen":
                case "Akuntansi":
                    faculty = "Fakultas Ekonomi";
                    break;
                case "Administrasi Publik":
                case "Administrasi Bisnis":
                case "Hubungan Internasional":
                    faculty = "Fakultas Ilmu Sosial dan Politik";
                    break;
                case "Tekink Sipil":
                case "Arsitektur":
                    faculty = "Fakultas Teknik";
                    break;
                case "Matematika":
                case "Fisika":
                case "Informatika":
                    faculty = "Fakultas Teknologi Informasi dan Sains";
                    break;
                default:
                    faculty = "";
                    break;
            }
    
            return faculty;
        };
   


    return (
        <>
            {/* TODO: answer here */}
            <div>
                <div>
                    <form id="form-student" onSubmit={handleSubmit}>
                        <h2>Add Student</h2>
                        <div>
                            <div>
                                <img src={formData.profilePicture} alt="Profile" data-testid="previewPicture" />
                               
                                <label>Full Name:
                                    <Input type="text" name="fullname" value={formData.fullname}
                                    onChange={handleChange} data-testid="name" />
                                </label>

                                <label>Profile Picture:
                                    <Input type="text" name="profilePicture" value={formData.profilePicture}
                                    onChange={handleChange} data-testid="profilePicture" />
                                </label>

                                <label>Address:
                                    <Input type="text" name="address" value={formData.address}
                                    onChange={handleChange} data-testid="address" />
                                </label>

                                <label>Phone Number:
                                    <Input type="text" name="phoneNumber" value={formData.phoneNumber}
                                    onChange={handleChange} data-testid="phoneNumber" />
                                </label>

                                <div>
                                    <label>Birth Date:
                                        <Input type="date" name="birthDate" value={formData.birthDate}
                                        onChange={handleChange} data-testid="date" />
                                    </label>

                                    <label>Gender:
                                        <Select name="gender" id="input-gender" data-testid="gender"
                                        value={formData.gender} onChange={handleChange} required>
                                            
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Select>
                                    </label>
                                </div>
                                <label htmlFor="input-prody">Program Study</label>
                                <Select name="programStudy" id="input-prody" data-testid="prody"
                                value={formData.programStudy} onChange={handleChange} required>
                                    
                                    <option value="Ekonomi">Ekonomi</option>
                                    <option value="Manajemen">Manajemen</option>
                                    <option value="Akuntansi">Akuntansi</option>
                                    <option value="Administrasi Publik">Administrasi Publik</option>
                                    <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                                    <option value="Hubungan Internasional">Hubungan Internasional</option>
                                    <option value="Teknik Sipil">Teknik Sipil</option>
                                    <option value="Arsitektur">Arsitektur</option>
                                    <option value="Matematika">Matematika</option>
                                    <option value="Fisika">Fisika</option>
                                    <option value="Informatika">Informatika</option>
                                </Select>
                            </div>
                            <Button type="submit" id="add-btn" data-testid="add-btn">Add Student</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddStudent;

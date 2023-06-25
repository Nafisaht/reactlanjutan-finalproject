// TODO: answer here
import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Input, Button, Select} from "@chakra-ui/react";

const EditStudent = () => {
    // TODO: answer here

    const nav = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        fullname: "",
        address: "",
        phoneNumber: "",
        birthDate: "",
        gender: "",
        programStudy: "",
    });

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3001/student/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData(data);
                setLoading(false);
            }
        );
    }, [id]);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        
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

        fetch(`http://localhost:3001/student/${id}`, {
            method: "PUT",
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
            })
            .finally(() => {
                setLoading(false);
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
                faculty = "Fakultas Ilmu Sosial dan Politik";
                break;
            case "Teknik Sipil":
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
                    <form onSubmit={handleSubmit}>
                        <h1>Edit Student</h1>
                        {loading ? (
                            <p>Loading ...</p>
                        ):(
                            <div>
                                <div>
                                    <img src={formData.profilePicture} alt="Profile" data-testid="previewPicture" />
                                    
                                    <label>Full Name: 
                                        <Input type="text" name="fullname" 
                                        value={formData.fullname} onChange={handleChange} data-testid="name" />
                                    </label>
                                    
                                    <label>Address: 
                                        <Input type="text" name="address" 
                                        value={formData.address} onChange={handleChange} data-testid="address" />
                                    </label>

                                    <label>Phone Number: 
                                        <Input type="text" name="phoneNumber" 
                                        value={formData.phoneNumber} onChange={handleChange} data-testid="phoneNumber" />
                                    </label>
                                    <div>
                                        <label>Birth Date: 
                                            <Input type="date" name="birthDate" 
                                            value={formData.birthDate} onChange={handleChange} data-testid="date" />
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
                                <Button type="submit" id="edit-btn" data-testid="edit-btn">
                                    Edit Student
                                </Button>
                            </div>
                        )}
                        
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditStudent;

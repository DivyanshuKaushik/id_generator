import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveAs } from 'file-saver';
import {API_URI} from '../config'
import API from "../API";

const Table = ({ data ,updateData}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [image, setImage] = useState(null);
    const viewImage = (path) => {
        setImage(`${API_URI}/static/cards/${path}`);
    };
    const saveImage = (image)=>{
        saveAs(`${API_URI}/static/cards/${image}`,image)
    }
    const deleteCard = async(id)=>{
        if(window.confirm("Do you Want to Delete?")){
            const res = (await API.delete(`/student/${id}`)).data
            updateData()
        }
    }
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">S No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Class</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, i) => (
                        <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{item.fullname}</td>
                            <td>{item.Class}</td>
                            <td className="d-flex justify-content-around">
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => {
                                        handleShow();
                                        viewImage(item.image);
                                    }}
                                >
                                    View
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={()=>saveImage(item.image)}
                                    className="mx-3"
                                >
                                    Download
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={()=>deleteCard(item.id)}
                                    className=""
                                >
                                    Delete
                                </Button>
                                
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>ID Card</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="">
                                            <img
                                                src={image}
                                                alt=""
                                                className="img-fluid"
                                            />
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Table;

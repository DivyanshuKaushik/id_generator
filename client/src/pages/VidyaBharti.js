import React, { useEffect, useState } from "react";
import API from "../API";
import Table from "../components/Table";
import Create from "./Create";
import styles from './vidyabharti.module.css'

const VidyaBharti = () => {
    const [students, setStudents] = useState([]);
    const [change, setChange] = useState(false);
    useEffect(() => {
        async function fetchStudents() {
            const data = (await API.get("/student")).data.data;
            console.log(data);
            setStudents(data.reverse());
        }
        fetchStudents();
    }, [change]);
    
    function updateData(){
        setChange(!change)
    }
    return (
        <>
            <div className="container my-4">
                <Create updateData={updateData} />
            </div>
            <div className={styles.id_container}>
                <Table data={students} updateData={updateData} />
            </div>
        </>
    );
};

export default VidyaBharti;

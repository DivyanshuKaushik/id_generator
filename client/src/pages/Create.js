import React, { useState } from "react";
import API from "../API";

const Create = ({updateData}) => {
    const fields = ["fullname", "father", "Class", "mobile", "dob", "address"];
    const [data, setData] = useState({
        fullname: "",
        father: "",
        Class: "",
        mobile: "",
        dob: "",
        address: "",
    });
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageUrl(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        setImage(e.target.files[0]);
    };

    const saveData = async (e) => {
        e.preventDefault();
        if (
            !(
                data.fullname &&
                data.father &&
                data.Class &&
                data.mobile &&
                data.dob &&
                data.address &&
                image
            )
        ) {
            alert("Empty Fields");
        }
        const formData = new FormData()
        formData.append('fullname',data.fullname.toUpperCase())
        formData.append('father',data.father.toUpperCase())
        formData.append('Class',data.Class.toUpperCase())
        formData.append('mobile',data.mobile.toUpperCase())
        formData.append('dob',data.dob.toUpperCase())
        formData.append('address',data.address.toUpperCase())
        formData.append('file',image)
        const res = (await API.post("/student", formData)).data;
        setData({
            fullname: "",
            father: "",
            Class: "",
            mobile: "",
            dob: "",
            address: "",
        });
        setImage(null)
        setImageUrl(null)
        updateData()
        alert(res.message);
    };

    return (
        <div className="container my-3">
            <div className="">
                {/* save info  */}
                <form className="d-flex flex-wrap justify-content-around" onSubmit={saveData}>
                    {fields.map((field, i) => (
                        <div className="col-lg-4" key={i}>
                            <label
                                htmlFor={field}
                                className="col-sm-2 col-form-label text-capitalize"
                            >
                                {field}
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={data[field]}
                                    name={field}
                                    onChange={handleInput}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    ))}
                    <div className="row mt-3">
                        <label
                            htmlFor="image"
                            className="col-sm-2 col-form-label text-capitalize"
                        >
                            Upload Image
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="file"
                                accept=".jpg,.png,.svg,.jpeg,.webp"
                                onChange={handleImage}
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>

                    </div>
                </form>
                {/* upload image  */}
                <div className="my-3 py-3">
                    {imageUrl && (
                        <div className="d-flex">
                            {/* preview image */}
                            <div className="col-lg-4 ">
                                <img
                                    src={imageUrl}
                                    alt=""
                                    className="img-fluid"
                                />
                            </div>
                            <div className="mx-3">
                                <button
                                    onClick={() => {setImageUrl(null);setImage(null)}}
                                    className="btn btn-sm btn-danger"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ) }
                    {/* generate id  */}
                </div>
            </div>
        </div>
    );
};

export default Create;

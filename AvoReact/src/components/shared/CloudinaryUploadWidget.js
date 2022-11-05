import React, { useEffect } from "react";
import Axios from 'axios'
import { Button } from 'react-bootstrap'

const CloudinaryUploadWidget = ({ handleImageChange, picture, setPicture, setImageSelected, imageSelected }) => {

    const uploadImage = (files) => {
        // console.log(files[0])
        const formData = new FormData()
        formData.append("file", imageSelected())
        formData.append("upload_preset", "gxc7sx3v")

        Axios.post("https://api.cloudinary.com/v1_1/dtszeeznm/image/upload", formData)
            .then((response) => {
                setPicture(response.data.url)
                handleImageChange(response.data.url)
            })
    };

    // useEffect(() => {
    //     return () => {
    //         setPicture('')
    //         // setImageSelected('')
    //     }
    // }, [])
    
    return (
        <div>
            <input
                type="file"
                onChange={(e) => { setImageSelected(e.target.files[0]) }}
                // getting an error here: 
            />
            <Button id="upload_widget" className="m-2 cloudinary-button btn-secondary" onClick={uploadImage}>
                Upload
            </Button>

            <img
                style={{ width: 200 }}
                cloudName="dtszeeznm"
                src={picture}
            />
        </div>
    );

}

export default CloudinaryUploadWidget;

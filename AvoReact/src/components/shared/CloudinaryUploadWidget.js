import React, { useState } from "react";
import Axios from 'axios'
import { Button } from 'react-bootstrap'

const CloudinaryUploadWidget = () => {

    const [imageSelected, setImageSelected] = useState('')

    const uploadImage = (files) => {
        // console.log(files[0])
        const formData = new FormData ()
        formData.append("file", files[0])
        formData.append("upload_preset", "gxc7sx3v")
        
        Axios.post("https://api.cloudinary.com/v1_1/dtszeeznm/image/upload", formData).then((response) => {
            console.log(response);
        });
    };


    return (
        <div>
            <input
                type="file"
                onChange={(e) => {setImageSelected(e.target.files)}}
            />
            <Button id="upload_widget" className="m-2 cloudinary-button btn-secondary" onClick={uploadImage}
            >
                Upload
            </Button>
        </div>
    );

}

export default CloudinaryUploadWidget;

import React, { useState } from "react";
import Axios from 'axios'
import { Button } from 'react-bootstrap'
import { Image } from 'cloudinary-react'

const CloudinaryUploadWidget = () => {

    const [imageSelected, setImageSelected] = useState('')

    const uploadImage = (files) => {
        // console.log(files[0])
        const formData = new FormData ()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "gxc7sx3v")
        
        Axios.post("https://api.cloudinary.com/v1_1/dtszeeznm/image/upload", formData).then((response) => {
            console.log(response);
        });
    };

    let public_id = null

    return (
        <div>
            <input
                type="file"
                onChange={(e) => {setImageSelected(e.target.files[0])}}
            />
            <Button id="upload_widget" className="m-2 cloudinary-button btn-secondary" onClick={uploadImage}
            >
                Upload
            </Button>

            <Image 
                style={{width: 200}}
                cloudName="dtszeeznm" 
                publicId= {`https://res.cloudinary.com/dtszeeznm/image/upload/v1667425812/${public_id}.jpg`}
            />
        </div>
    );

}

export default CloudinaryUploadWidget;

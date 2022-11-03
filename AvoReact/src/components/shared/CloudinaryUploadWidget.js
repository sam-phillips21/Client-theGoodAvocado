import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { Button } from 'react-bootstrap'
// import { Image } from 'cloudinary-react'

const CloudinaryUploadWidget = ({ handleImageChange }) => {

    const [imageSelected, setImageSelected] = useState('')
    const [picture, setPicture] = useState('')

    const uploadImage = (files) => {
        // console.log(files[0])
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "gxc7sx3v")

        Axios.post("https://api.cloudinary.com/v1_1/dtszeeznm/image/upload", formData)
            .then((response) => {
                // console.log(response.data.url);
                setPicture(response.data.url)
                handleImageChange(response.data.url)
                // console.log('this is public_id', public_id)
            });
            return (e) => {
                e.target.files = ''
                // console.log('post setPictureMount', setPicture)
                // setPicture('')
                // // setImageSelected('')
                // // handleImageChange('')
            }
    };

     // useEffect(() => {
    //     console.log('setPicture pre', setPicture)
    
    //     return () => {
    //       console.log('setPicture post', setPicture)
    //       setPicture('')
    //     }
    //   }, [])

    return (
        <div>
            <input
                type="file"
                onChange={(e) => { setImageSelected(e.target.files[0]) }}
            />
            <Button id="upload_widget" className="m-2 cloudinary-button btn-secondary" onClick={uploadImage}
            >
                Upload
            </Button>


            <img
                style={{ width: 200 }}
                cloudName="dtszeeznm"
                // publicId= { picture }
                src={picture}
            />
        </div>
    );

}

export default CloudinaryUploadWidget;

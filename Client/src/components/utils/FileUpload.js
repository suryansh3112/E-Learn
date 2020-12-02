import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
function FileUpload(props) {

    const [image, setImage] = useState()
   

    const onDrop = async (files) =>{

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 

        try {
            const response = await axios.post('http://localhost:5000/api/uploadImage', formData, config)
        
            if(response.data.success){
                const imagePath = response.data.image.replaceAll('\\','/')
                setImage(imagePath);
                props.addImage(imagePath)
            }
        } catch (error) {
            alert('Failed to save the Image in Server')
        }
       
        
        
    }


    // const onDelete = (image) => {
    //     const currentIndex = Images.indexOf(image);

    //     let newImages = [...Images]
    //     newImages.splice(currentIndex, 1)

    //     setImages(newImages)
    //     props.refreshFunction(newImages)
    // }
    

    return (
        <>
        
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div  {...getRootProps()} >
                    
                        
                        <input {...getInputProps()} />

                       { image ? <img src={`http://localhost:5000/${image}`} height='120px' width='120px' style={{borderRadius:'50%'}}/>:
                        <Avatar size={120} icon={<UserOutlined />} />}
                        
                    </div>
                )}
            </Dropzone>

            
        </div>
        
        </>
    )
}

export default FileUpload

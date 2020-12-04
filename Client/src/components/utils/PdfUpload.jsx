import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Avatar } from 'antd';
import {  PlusOutlined} from '@ant-design/icons';
import axios from 'axios';
import ReactPlayer from 'react-player'

function PdfUpload(props) {

    
   

    const onDrop = async (files) =>{

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 

        try {
            const response = await axios.post('http://localhost:5000/api/uploadFile', formData, config)
        
            if(response.data.success){
                const fPath = response.data.file.replaceAll('\\','/')
               
                props.addFile(fPath)
            }
        } catch (error) {
            alert('Failed to save the Video in Server')
        }
       
        
        
    }


    // const onDelete = (image) => {
    //     const currentIndex = Images.indexOf(image);

    //     let newImages = [...Images]
    //     newImages.splice(currentIndex, 1)

    //     setVideos(newImages)
    //     props.refreshFunction(newImages)
    // }
    

    return (
        <>
        {/* type="application/pdf" */}
        {props.fpath ? <embed src={`http://localhost:5000/${props.fpath}`} height="300px" width="100%"></embed>
         : 
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div  {...getRootProps()} >
                    
                        
                        <input {...getInputProps()} />

                       {/* { image ? <img src={`http://localhost:5000/${image}`} height='120px' width='120px' style={{borderRadius:'50%'}}/>:
                        <Avatar size={120} icon={ <PlusOutlined />} />} */}
                        <Avatar size={150} icon={ <PlusOutlined />} />
                    </div>
                )}
            </Dropzone>

            
        </div>}
        
        </>
    )
}

export default PdfUpload

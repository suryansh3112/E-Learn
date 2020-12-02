import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Avatar } from 'antd';
import {  PlusOutlined} from '@ant-design/icons';
import axios from 'axios';
import ReactPlayer from 'react-player'

function VideoUpload(props) {

    
   

    const onDrop = async (files) =>{

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 

        try {
            const response = await axios.post('http://localhost:5000/api/uploadVideo', formData, config)
        
            if(response.data.success){
                const videoPath = response.data.video.replaceAll('\\','/')
               
                props.addVideo(videoPath)
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
        
        {props.video ? <ReactPlayer url={`http://localhost:5000/${props.video}`} />
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

export default VideoUpload

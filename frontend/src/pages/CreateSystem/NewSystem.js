import React, { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from "react-dnd-touch-backend";
import ImageList from '../../components/HMIComponents/ImageList'
import Dropzone from "../../components/HMIComponents/Dropzone";
import update from "immutability-helper";
import cuid from "cuid";
import Box from "@mui/material/Box";


export default function NewSystem() {
    const [images, setImages] = useState([]);
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.map(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                setImages(prevState => [
                    ...prevState,
                    { id: cuid(), src: e.target.result }
                ]);
            };
            reader.readAsDataURL(file);
            return file;
        });
    }, []);
    const moveImage = (dragIndex, hoverIndex) => {
        // Get the dragged element
        const draggedImage = images[dragIndex];
        /*
          - copy the dragged image before hovered element (i.e., [hoverIndex, 0, draggedImage])
          - remove the previous reference of dragged element (i.e., [dragIndex, 1])
          - here we are using this update helper method from immutability-helper package
        */
        setImages(
            update(images, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
            })
        );
    };
    // Check whether the device support touch
    const isTouchDevice = () => {
        if ("ontouchstart" in window) {
            return true;
        }
        return false;
    };

// Assigning backend based on touch support on the device
    const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

// We will pass this function to ImageList and then to Image -> Quite a bit of props drilling, the code can be refactored and place all the state management in ImageList itself to avoid props drilling. It's an exercise for you :)
    return (
        <Box sx={{display: 'flex'}}>
            <Dropzone onDrop={onDrop} accept={"image/*"} />
            {images && images.length > 0 && (
                <h3 className="text-center">Drag the Images to change positions</h3>
            )}
            <DndProvider backend={backendForDND}>
                <ImageList images={images} moveImage={moveImage} />
            </DndProvider>
        </Box>
    );
}
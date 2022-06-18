import React, {useState} from "react";
import {Container} from "./Container";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {CustomDragLayer} from "./CustomDragLayer";
import DragDrop from "./simpleExample/DragDrop";

export default function DragAndDrop() {

    return (
        <DndProvider backend={HTML5Backend}>
            <p>
                Drag components from the left to crate a system.
            </p>
           {/* <Container/>
            <CustomDragLayer/>*/}
        <DragDrop/>
        </DndProvider>
    );
}
import React, {memo} from 'react';
import {Component} from "./Component";

const styles = {
    display: 'inline-block',
    transform: 'rotate(-7deg)',
    WebkitTransform: 'rotate(-7deg)',
}
export const ComponentDragPreview = memo(function ComponentDragPreview({image}) {
    return (
        <div style={styles}>
            <Component image={image} preview/>
        </div>

    )
})

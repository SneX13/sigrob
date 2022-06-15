import { memo } from 'react'
const styles = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
}
export const Component = memo(function Component({ title, yellow, preview }) {
    const backgroundColor = yellow ? 'yellow' : 'white'
    return (
        <div
            style={{ ...styles, backgroundColor }}
            role={preview ? 'ComponentPreview' : 'Component'}
        >
            {title}
        </div>
    )
})

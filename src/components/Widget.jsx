import React from 'react'
import { removeWidget } from '../redux/categoriesSlice'
import { useDispatch } from 'react-redux'

function Widget({ widget,categoryIndex }) {
    const dispatch = useDispatch()
    const handleDelete = (id) => {
        dispatch(removeWidget({categoryIndex , widgetId : id}))
    }
    return (
        <div className="mb-3">
            <div className="card" style={{ height: "10rem" }}>
                <div className="container">
                    <div className='fs-5 fw-semibold d-flex align-items-center justify-content-between'>
                        <span>{widget.name} </span>
                        <button className='btn' onClick={() => handleDelete(widget.id)}>
                            <i className="fa-regular fa-trash-can"></i>
                        </button>

                    </div>
                    <div className='d-flex align-items-center justify-content-center' style={{height:"100%"}}>{widget.text}</div>
                </div>
            </div>
        </div>

    )
}

export default Widget

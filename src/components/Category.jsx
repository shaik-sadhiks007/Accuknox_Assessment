import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget } from '../redux/categoriesSlice';
import Widget from './Widget';

function Category({ category }) {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
    const [widgetName, setWidgetName] = useState('');
    const [widgetText, setWidgetText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    const handleShowWidgetModal = (index) => {
        setSelectedCategoryIndex(index);
        setWidgetName('');
        setWidgetText('');
        setIsModalOpen(true);
    };

    const handleHideWidgetModal = () => {
        setIsModalOpen(false);
    };

    const handleAddWidget = (e) => {
        e.preventDefault();
        if (selectedCategoryIndex === null) {
            console.error('Category Index is not set.');
            return;
        }

        dispatch(addWidget({ categoryIndex: selectedCategoryIndex, widgetName, widgetText }));
        setWidgetName('');
        setWidgetText('');
        handleHideWidgetModal();
    };

    return (
        <div>
            <span className='fw-semibold'>{category.category}</span>
            <div className="row mt-2">
                {category.widgets.map(widget => (
                    <div className="col-12 col-sm-6 col-md-4 mb-3" key={widget.id}>
                        <Widget widget={widget} categoryIndex={category.categoryIndex} />
                    </div>
                ))}
                <div className="col-12 col-sm-6 col-md-4 mb-3">
                    <div className="card d-flex justify-content-center align-items-center" style={{ height: "10rem" }}>
                        <div className="card-body d-flex justify-content-center align-items-center">
                            <button
                                className='btn custom-btn'
                                onClick={() => handleShowWidgetModal(category.categoryIndex)}
                            >
                                Add widget +
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conditionally Render Widget Modal */}
            {isModalOpen && (
                <div
                    className="custom-backdrop show"
                    onClick={(e) => {
                        // Close modal if clicking outside of the modal content
                        if (e.target === e.currentTarget) {
                            handleHideWidgetModal();
                        }
                    }}
                >
                    <div className="custom-modal show">
                        <div className="custom-modal-header">
                            <h5 className="modal-title">
                                Add New Widget
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleHideWidgetModal}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="custom-modal-body">
                            <form onSubmit={handleAddWidget}>
                                <div className="mb-3">
                                    <label htmlFor="widgetName" className="form-label">
                                        Widget Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="widgetName"
                                        value={widgetName}
                                        onChange={(e) => setWidgetName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="widgetText" className="form-label">
                                        Widget Text
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="widgetText"
                                        rows="3"
                                        value={widgetText}
                                        onChange={(e) => setWidgetText(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Add widget
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Category;

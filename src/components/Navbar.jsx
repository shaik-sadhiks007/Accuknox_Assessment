import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCategory, handleSearch } from "../redux/categoriesSlice";

function Navbar() {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [search, setSearch] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useDispatch();

    const handleAddCategory = (e) => {
        e.preventDefault();
        dispatch(addCategory({ newCategoryName }));
        setNewCategoryName('');
        setIsModalVisible(false); // Hide the modal
    };

    useEffect(() => {
        dispatch(handleSearch(search));
    }, [search, dispatch]);

    return (
        <>
            <div className='container'>
                <div className='row align-items-center mb-3'>
                    <div className='col-12 col-md-3 mb-2 mb-md-0'>
                        <span className='fw-bold'>CNAPP Dashboard</span>
                    </div>
                    <div className='col-12 col-md-6 mb-2 mb-md-0'>
                        <nav className="navbar p-0">
                            <div className="container-fluid p-0">
                                <form className="d-flex w-100" role="search">
                                    <input
                                        className="form-control Search w-100"
                                        type="search"
                                        placeholder="Search by Category or Widget name..."
                                        aria-label="Search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </form>
                            </div>
                        </nav>
                    </div>
                    <div className='col-12 col-md-3 text-end'>
                        <button
                            className='btn custom-btn'
                            onClick={() => setIsModalVisible(true)} // Show modal
                        >
                            Add Category +
                        </button>
                    </div>
                </div>

                {/* Custom Modal Backdrop */}
                {isModalVisible && (
                    <div
                        className="custom-backdrop show"
                        onClick={(e) => {
                            // Close modal if clicking outside of the modal content
                            if (e.target === e.currentTarget) {
                                setIsModalVisible(false);
                            }
                        }}
                    >
                        <div className="custom-modal show">
                            <div className="custom-modal-header">
                                <h5 className="modal-title">
                                    Add New Category
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsModalVisible(false)} // Hide modal
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="custom-modal-body">
                                <form onSubmit={handleAddCategory}>
                                    <div className="mb-3">
                                        <label htmlFor="categoryName" className="form-label">
                                            Category Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="categoryName"
                                            value={newCategoryName}
                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Add Category
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Navbar;

import { useEffect, useState } from "react";
import { addCategory, handleSearch } from "../redux/categoriesSlice";
import { useDispatch } from "react-redux";

function Navbar() {

    const [newCategoryName, setNewCategoryName] = useState('');
    const [search, setSearch] = useState('')

    console.log(search, "se")

    const dispatch = useDispatch()

    const handleAddCategory = (e) => {
        e.preventDefault();
        dispatch(addCategory({ newCategoryName }));
        setNewCategoryName('');
        const modal = document.getElementById('addCategoryModal');
        const modalInstance = window.bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
            modalInstance.hide();
        }
    };
    useEffect(() => {
        dispatch(handleSearch(search))
    }, [search])
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
                            data-bs-toggle="modal"
                            data-bs-target="#addCategoryModal"
                            onClick={(e) => handleAddCategory(e)}
                        >
                            Add Category +
                        </button>
                    </div>
                </div>

                {/* Add Category Modal */}
                <div
                    className="modal fade"
                    id="addCategoryModal"
                    tabIndex="-1"
                    aria-labelledby="addCategoryModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addCategoryModalLabel">
                                    Add New Category
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
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
                </div>
            </div>

        </>

    )
}

export default Navbar

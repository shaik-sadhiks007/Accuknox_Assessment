import React from 'react'
import { useSelector } from 'react-redux'
import Category from './Category'

function Dashboard() {

    const categories = useSelector((state) => state.categories)

    console.log(categories)

    return (
        <div className='container mt-3'>
            {
                categories.length > 0 ? (
                    categories.map((category) => (
                        <Category key={category.categoryIndex} category={category} />
                    ))
                ) : (
                    <div className='text-center fs-5 mt-3'>No results found....</div>
                )
            }

        </div>
    )
}

export default Dashboard

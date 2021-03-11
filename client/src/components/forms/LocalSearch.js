

import React from 'react'

const LocalSearch = ({ setKeyword, keyword }) => {
    // const [keyword, setKeyword] = useState("");
    const handleSearchChange = (e) => {
        e.preventDefault()
        setKeyword(e.target.value)


    }

    return (

        <div className='container' >
            <input
                type="search"
                placeholder='Filter'
                value={keyword}
                onChange={handleSearchChange}
                className='form-control mb-4'
            />

        </div >

    )
}
export default LocalSearch
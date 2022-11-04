import React, { useState } from "react"
// import ".src/index.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Input } from 'antd'
import { useNavigate } from 'react-router-dom'


const { Search } = Input

const SearchBar = () => {
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState('')

    const onSearch = (searchInput) => {
        setInputValue('')
        navigate(`restaurants/search/${searchInput}`)
    }

    return (
        <div className="search">
            <div className="searchInputs">
                <Search
                    placeholder="Restaurant, type, or city"
                    onSearch={onSearch}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>
        </div>
    )
}

export default SearchBar
import React, { useState, useEffect} from "react"
// import ".src/index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import {Input, Space, Button} from 'antd'

const {Search} = Input

const SearchBar = () => {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [error, setError] = useState("")
    const [input, setInput] = useState("")
    const [newFilter, setNewFilter] = useState([])

    console.log('I hit here')
    useEffect(() => {
        axios.get('http://localhost:8000/restaurants')
        .then((response) => {
            console.log(response.data)
            setData(response.data)
            setFilteredData(response.data)
        })
        .catch((err) => {
            console.log(err)
            setError(err)
        })
    }, [])
    const handleFilter = (e) => {
        console.log('I tried to hit here')
        console.log('event',e)
        const searchInput = e.target.value
        setInput(searchInput)       
        const newFilter = data.filter((value) => {
            return  value.name.toLowerCase().includes(searchInput.toLowerCase())
        })
        if (searchInput === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    }
    
console.log('a little bit farther down')
const onSearch = (searchInput) => {
    const newFilter = data.restaurants.filter((value) => {
        return  value.name.toLowerCase().includes(searchInput.toLowerCase())
    })
    console.log('new filter', newFilter)
}

return(
    <div className="search">
        <div className="searchInputs">
        <Search
            placeholder="Search for a Restaurant" 
            // value={input}
            onSearch={onSearch}       
            // enterButton={handleFilter}
        />
        </div>
        {/* {filteredData.length != 0 && (
        <div className="dataResult">
        {filteredData.slice(0, 10).map((value, index) => {
        return (
        <div className="dataItem" key={value.id}>
            <p>{value.name}</p>
        </div>
        )
        })}
        </div>
        )}  */}

        {/* <div className="dataResult">
            <p>{newFilter.name}</p>
        </div> */}
      

    </div>
)} 

export default SearchBar





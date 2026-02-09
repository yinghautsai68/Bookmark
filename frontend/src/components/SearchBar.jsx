import React from 'react'
import * as Icons from 'react-feather'

const SearchBar = ({ className, setSearch }) => {
    return (
        <div className={`flex flex-row ${className} items-center gap-5 `}>
            < input onChange={(e) => setSearch(e.target.value)} className={`w-full p-2 bg-gray-900 rounded placeholder-gray-500 `
            } type="text" placeholder="搜尋" />
            <Icons.Search />
        </div >
    )
}

export default SearchBar
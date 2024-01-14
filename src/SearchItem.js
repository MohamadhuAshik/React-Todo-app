import React from 'react'

export const SearchItem = ({search,setSearch}) => {
  return (
    <form  className='searchForm' onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor='search'>Search</label>
         <input
           type='text'
           id='search'
           role='searchbox'
           value={search}
           onChange={(e)=>setSearch(e.target.value)}
           placeholder='search Item'
         />
    </form>
  )
}
export default SearchItem

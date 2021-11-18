import React, { useState, useEffect, Fragment } from 'react'
import './App.css';

const App = () => {
  const [defaultCategory, setDefaultCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [inputFilter, setInputFilter] = useState('');

  const inputFilterChange = (e) => {
    setInputFilter(e.target.value)
  }

  useEffect(()=>{
    fetch('https://api.publicapis.org/categories')
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result);
          setCategory(result);
          setDefaultCategory(result);
        }
      )
  },[])

  useEffect(()=>{
    if(inputFilter!==''){
      let filteredCategory = defaultCategory.filter(item => {
        return item.toLowerCase().includes(inputFilter.toLowerCase())
      })
      setCategory(filteredCategory);
    }else{
      setCategory(defaultCategory);
    }
    
  },[inputFilter])
  return (
    <Fragment>
      <div className="form-filter">
        <label htmlFor="exampleInputEmail1" className="form-label">Input Filter:</label>
        <input type="text" className="form-control" value={inputFilter} onChange={inputFilterChange}  aria-describedby="help"/>
      </div>
      <h6>{category.length} results </h6>
      <ul className="list-group">
      {
        category.map(item => {
          return (
              <li key={item} className="list-group-item">{item}</li>
              )
            })
      }
        </ul>
    </Fragment>
  )
}

export default App


// Category.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({giveSortData}) => {
 
  return (
    <div className='flex h-20 justify-between items-center font-sans font-normal'>
      <div className='flex gap-x-6 ml-8 pb-5 '>
      <button>
        <Link to="/agriculture">Agriculture</Link>
      </button>
      <button>
        <Link to="/home-decor">Home Decor</Link>
      </button>
      <button>
        <Link to="/fashion">Fashion</Link>
      </button>
      <button>
        <Link to="/artandcraft">Art and Craft</Link>
      </button>
      </div>
      <div className=" flex w-[13%] justify-center items-center mr-8 pb-5">
  <label htmlFor="sort">Sort by: </label>
  <select name="sort" id="sort" onChange={(event) => giveSortData(event.target.value)}>
    <option value="low-high">Low to high</option>
    <option  value="high-low">High to low</option>
  </select>
</div>

    </div>
  );
};

export default Category;

import React from 'react';
const Pagination =({paginate}) =>{
    const pageNumbers =[];
    for(let i =1; i<Math.ceil(104/10);i++){
          pageNumbers.push(i);
    }
    return (
        <nav className='pagination'>
            {pageNumbers.map(number=>(
                <li key={number} className="page-item">
                    <a onClick={()=>paginate(number)} href="!#" className='page-link'>
                        {number}
                    </a>
                </li>
            ))}
        </nav>
    )
}
export default Pagination
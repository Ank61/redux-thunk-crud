import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import '../components/userContainer.css'
import { fetchUsers } from '../redux'
import Pagination from '../pagination/pagination'
import data from '../Data/data'

function UsersContainer ({ userData, fetchUsers }) {
  const[searchClicked, SetSearchClicked]=useState(false)
  const[searched,setSearched]=useState([])
  const [currentPage,setCurrentPage]=useState(1)
  const [edit,setEdit] =useState('')
  const [id,setId] =useState()
  const [searchitem,setSearchItem]=useState('')


//////////PAgination Logic Get Current Logic ///////////////
const indexofLastPost = currentPage * 10;
const indexOfFIrstPost = indexofLastPost-10;
const currentPost = userData.users.slice(indexOfFIrstPost,indexofLastPost)
const paginatefunc =(pageNumbers)=>{ setCurrentPage(pageNumbers)}

function handleSearch(){
    SetSearchClicked(true)
    var search = userData.users.filter(function(item){return item.title.startsWith(searchitem)})
    setSearched(search)
  }
  function handleEdit(user){
    setId(user.id)
    setEdit(user.title)
    console.log(user.title) 
  }
function saveChanges(){
  if(edit!==''){
    let inputText = edit
    console.log(inputText)
    // const newTitle={ "title" :inputText  }
    let dataid= Number(id)
    console.log(dataid )
    const index = data.findIndex(object => {
      return object.id === dataid;
    });
    if (index !== -1) {
      data[index].title = inputText;
    }
    // axios.put(`https://jsonplaceholder.typicode.com/todos/${data}`,newTitle).then(
    //   response=> 
    //   console.log("Data Changed Status : ",response, "Data Edited at id :",response.data.id, "Data Edited with title : ",response.data.title)
    // ).catch(error=>{console.log(error)})
    setEdit("")
    setId()
  }
}

function handledelete(user){
setId(user.id)
// data.filter((id)=>{return id.id!==user.id})
delete data[user.id -1];
}
  useEffect(() => {
    fetchUsers()
  }, [])

if(searchClicked){
  return userData.loading ? (
    <h2>Loading</h2>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : (
    <div>
      <h2 className='text-primary mb-3'>Users List</h2>
      <input type="text"  onChange={(e)=>setSearchItem(e.target.value)}></input>
      <button onClick={()=>handleSearch()} className='btn btn-primary btn-sm button'>Search</button>
      <div className="container" style={{marginTop:10}}>
    <table className="table  table-striped table hover">

<thead style={{backgroundColor:'#6b7ae0'}}>

    <tr align="center">
      <th colSpan= {2} style={{color:'white'}}>Sr.No</th>
      <th colSpan={2} style={{color:'white'}}>User ID</th>
      <th colSpan={4} style={{color:'white'}}>Title</th>
      <th colSpan={2} style={{color:'white'}}>Task Completed</th> 
      <th colSpan={2} style={{color:'white'}}>Edit Title</th>
      <th colSpan={2} style={{color:'white'}}>Delete</th>  
    </tr>  
    </thead>
    <tbody>
    {userData &&
        searched.map(user => 
          <tr>
          <td colSpan={2}>{user.id}</td>
          <td colSpan={2}>{user.userId}</td>
          <td colSpan={4}>{user.title}</td>
          <td colSpan={2}>{String(user.completed)}</td>
          <td colSpan={2}> <button className='btn btn-primary btn-sm edit' onClick={()=>handleEdit(user)} data-toggle="modal" data-target="#exampleModal">Edit</button></td>
          <td colSpan={2}> <button className='btn btn-primary btn-sm edit' onClick={()=>handledelete(user)} >Delete</button></td>
        </tr>
        )}
    </tbody>
    </table>
    </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input type="text" className="form-control" value={edit} onChange={(e)=>setEdit(e.target.value)}></input>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={()=>saveChanges()} data-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
else{
return userData.loading ? (
  <h2>Loading</h2>
) : userData.error ? (
  <h2>{userData.error}</h2>
) : (
  <div>
    <h2 className='text-primary mb-3'>Users List</h2>
    <input type="text" id='search' onChange={(e)=>setSearchItem(e.target.value)}></input>
    <button className='btn btn-primary btn-sm button' onClick={()=>handleSearch()}>Search</button>
    <div className="container" style={{marginTop:10}}>
    <table className="table  table-striped table hover">

<thead style={{backgroundColor:'#6b7ae0'}}>

    <tr align="center">
      <th colSpan= {2} style={{color:'white'}}>Sr.No</th>
      <th colSpan={2} style={{color:'white'}}>User ID</th>
      <th colSpan={4} style={{color:'white'}}>Title</th>
      <th colSpan={2} style={{color:'white'}}>Task Completed</th> 
      <th colSpan={2} style={{color:'white'}}>Edit Title</th> 
      <th colSpan={2} style={{color:'white'}}>Delete</th> 
    </tr>  
    </thead>
    <tbody>
    {userData &&
        currentPost.map(user => 
          <tr>
          <td colSpan={2}>{user.id}</td>
          <td colSpan={2}>{user.userId}</td>
          <td colSpan={4}>{user.title}</td>
          <td colSpan={2}>{String(user.completed)}</td>
          <td colSpan={2}> <button className='btn btn-primary btn-sm edit' onClick={()=>handleEdit(user)} data-toggle="modal" data-target="#exampleModal">Edit</button></td>
          <td colSpan={2}> <button className='btn btn-primary btn-sm edit' onClick={()=>handledelete(user)}>Delete</button></td>
        </tr>
        )}
    </tbody>
    </table>
    </div>
<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input type="text" className="form-control" value={edit} onChange={(e)=>setEdit(e.target.value)}></input>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={()=>saveChanges()} data-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div className='center'>
    <Pagination paginate={paginatefunc}/>
    </div>
  </div>
)
}
}

const mapStateToProps = state => {

  return {
    userData: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer)

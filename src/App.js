import React, {Component} from 'react';

class Table extends Component{
  constructor(props){
    super(props)
    this.state={
      users:[],
      isLoading:true,
      isError: false
    }
  }
//getrequest
async componentDidMount(){
  this.setState({isLoading:true})

  const response=await fetch('https://api.artic.edu/api/v1/exhibitions')

  if(response.ok){
const users = await response.json()
console.log(users)
this.setState({users:users.data, isLoading:false})}
else{
  this.setState({isError:true, isLoading:false})
}
}

renderTableHeader=()=> {
return Object.keys(this.state.users[0]).map(attr =><th key={attr}>
{attr.toUpperCase()}
  </th>



)
}
renderTableRows=()=>{
return this.state.users.map(user =>{
  return(
    <tr>
<td>{user.id}</td>
<td>{user.title}</td>
<td>{user.description}</td>
<td>{user.is_featured}</td>
<td>{user.gallery_title}</td>
<td>{user.type}</td>

    </tr>
  )
})
}
  render(){
const{users, isLoading, isError}=this.state
if(isLoading){
  return <div>Loading...</div>
  }
if(isError){
  return <div> error...</div>
}

  return users.length > 0
  ? (
<table>
<thead>
<tr>
{this.renderTableHeader()}
</tr>
</thead>
<tbody>
{this.renderTableRows()}
</tbody>
</table>
  ):(
    <div>No users</div>
  )

}
}

export default Table;

import React, {useState, useEffect, Component} from 'react'
import {AddUserForm} from "./forms/AddUserForms";
import {EditUserForm} from "./forms/EditUserForm";
import {UserTables} from "./tables/UserTables";
import Table from "./Table/Table";
import Loader from "./Loader/Loader";

async function someAsyncFunction() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
    if (response.ok) {
      return await response.json();
    } else {
      console.log("Can't get data");
    }
  } catch (e) {
    console.log(e);
  }
}


const PUSSY = () => {

  const [jsonData, setJsonData] = useState({});
  
  useEffect(() => {
    async function datesInit() {
      const data = await someAsyncFunction();
      setJsonData(data);
    }
    
    datesInit();
  }, [])

console.log(jsonData)

  const usersData = jsonData;

  // const usersData = [
  //   {id: 1, name: 'Leanne Graham', username: 'Bret', },
  //   {id: 2, name: 'Ervin Howell', username: 'Antonette', } ,
  //   {id: 3, name: 'Clementine Bauch', username: 'Samantha',  } ,
  //   {id: 4, name: 'Patricia Lebsack', username: 'Karianne',  } ,
  //   {id: 5, name: 'Chelsey Dietrich', username: 'Kamren', } ,
  //   {id: 6, name: 'Mrs. Dennis Schulist', username: 'Leopoldo_Corkery' } ,
  //   {id: 7, name: 'Kurtis Weissnat', username: 'Elwyn.Skiles' } ,
  //   {id: 8, name: 'Nicholas Runolfsdottir V', username: 'Maxime_Nienow', } ,
  //   {id: 9, name: 'Glenna Reichert', username: 'Delphine' } ,
  //   {id: 10, name: 'Clementina DuBuque', username: 'Moriah.Stanton', },
  // ]

  // console.log(usersData);

  const [users, setUsers] = useState(usersData)

  console.log(users);

  const [editing, setEditing] = useState(false)

  const initialFormState = { id: null, name: '', username: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  
  const addUser = user => {
      user.id = users.length + 1
      setUsers([ ...users, user ])
  }

  const deleteUser = (id) => {
      setUsers(users.filter(user => user.id !== id))
  }

  const updateUser = (id, updatedUser) => {
      setEditing(false)
      setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  const editRow = user => {
      setEditing(true)
      setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }



  return (
      <div className="container">
          <h1>CONTACTS</h1>
          <div className="flex-row">
              <div className="flex-large">
                  {editing ? (
                      <div>
                          <h2>Редактировать пользователя</h2>
                          <EditUserForm
                              editing={editing}
                              setEditing={setEditing}
                              currentUser={currentUser}
                              updateUser={updateUser}
                          />
                      </div>
                  ) : (
                      <div>
                          <h2>Добавить пользователя</h2>
                          <AddUserForm addUser={addUser} />
                      </div>
                  )}
              </div>
              <div className="flex-large">
                  <h2>Просмотор пользователей</h2>
                  <UserTables users={users} editRow={editRow} deleteUser={deleteUser} />
              </div>
          </div>
      </div>
  )
}



class App extends Component {

  state ={
    isLoading: true,
    data: [],
  }

  async componentDidMount() {
    const response = await fetch(` https://jsonplaceholder.typicode.com/users`)
    const data = await response.json()
    //  console.log(data)
    this.setState({
      isLoading: false,
      data
    }) 
  }


render() {
  return (

    <div className="container">
     {
      this.state.isLoading 
      ? <Loader />
      : <PUSSY/>
     } 
      {/* {
        
        this.state.isLoading 
        ? <Loader />
        : <Table 
        data={this.state.data}
        />
      } */}
      </div>
  )
}
}


export default App;
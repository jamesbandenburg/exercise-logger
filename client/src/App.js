import React from 'react'
import './App.css';
import Navbar from './layout/Navbar'
import ActivitiesState from './context/ActivitiesState'
import UsersState from './context/UsersState'
import Main from './layout/Main'


const App = () => {


  return (
    <UsersState>
    <ActivitiesState>
     
      <div className="App">
        <Navbar />
        <Main />
      </div>
    </ActivitiesState>
    </UsersState>
  );
}

export default App;

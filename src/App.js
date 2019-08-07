import React, { Component } from 'react';
import contacts from './data/contacts.json'
import './App.css';

class App extends Component {

  state = {
    myContacts: contacts.splice(0,5),
    contacts,
  }

  // Add a random contact when clicking the button
  handleNewRandomContact = () => {
    const {contacts, myContacts} = this.state;
    const randomIndex = Math.round(Math.random()*contacts.length-1)
    const newContact = contacts[randomIndex];
    const newMyContacts = [...myContacts];
    newMyContacts.push(newContact);

    this.setState({
      myContacts: newMyContacts,
    })
  }

  // Sort by popularity when clicking the button

  handleSortByPopularity = () => {
    const {myContacts} = this.state;
    const newMyContacts = [...myContacts];
    newMyContacts.sort((a,b) => {
      return a.popularity - b.popularity
    })
    
    this.setState({
      myContacts: newMyContacts,
    })
  }
  
  // Sort by name when clicking the button
  
  handleSortByName = () => {
    const {myContacts} = this.state;
    const newMyContacts = [...myContacts];
    newMyContacts.sort((a,b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      // a must be equal to b
      return 0;
    })
    this.setState({
      myContacts: newMyContacts,
    })
  }

  // Delete contact when clicking the button

  handleDelete = (index) => {
    const {myContacts} = this.state;
    const newMyContacts = [...myContacts];
    newMyContacts.splice(index, 1);


    this.setState({
      myContacts: newMyContacts,
    })
  }


  render() {
    console.log(this.state)
    return (
      <div className="App">
        <h1>IronContacts</h1>
        <button onClick={this.handleNewRandomContact}>Add Random Contact</button>
        <button onClick={this.handleSortByName}>Sort by name</button>
        <button onClick={this.handleSortByPopularity}>Sort by popularity</button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.myContacts.map((contact, index) => {
              return (
                <tr key={index}>
                  <td><img src={contact.pictureUrl} alt={contact.name}/></td>
                  <td><p>{contact.name}</p></td>
                  <td><p>{contact.popularity}</p></td>
                  <td><button onClick={() => {this.handleDelete(index)}}>Delete</button></td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

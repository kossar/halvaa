import React, { Component } from 'react';
import Table from './Table';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      isSorted: {
                  "firstName": false,
                  "lastName": false,
                  "fullName": false,
                  "email": false,
                  "phone": false
                }
    };
  }
  

  componentDidMount() {
      if(!localStorage.getItem('contacts')){
        this.fetchData();
      }else{
        localStorage.getItem('contacts') && this.setState({
          contacts: JSON.parse(localStorage.getItem('contacts')),
        });
        console.log("localstorage");
      }
    
  }
  fetchData(){
    const url ='https://localhost:44394/Contacts';

    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({
          contacts: result.data
        })
      })
  }
  
  compareValues(key, reversed){
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
      let order;
      if (reversed) {
        order = "desc"
      }else {
        order = "asc"
      }
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }
  toggleListReverse = (contactProperty) => {
    const {contacts} = this.state
    let {isSorted} = this.state
    let sortedBy = isSorted[contactProperty]
    let contactsSorted = contacts.sort(this.compareValues(contactProperty, sortedBy));
    let newSortedStatus = isSorted;
    let status;
    for(status in newSortedStatus){
        if(status === contactProperty){
          newSortedStatus[status] = !newSortedStatus[status]
        }else{
          newSortedStatus[status] = false
        }
    }
    console.log(isSorted)
    this.setState({
      contacts: contactsSorted,
      isSorted: newSortedStatus
    })
  }
  
  componentWillUpdate(nextProps, nextState){
    localStorage.setItem("contacts", JSON.stringify(nextState.contacts));
  }
  removeCharacter = index => {
    const { contacts: contact } = this.state
  
    this.setState({
      contacts: contact.filter((contact, i) => {
        return i !== index
      }),
    })
  }

  render() {
    const { contacts: contact } = this.state
    return (
      <div className="container">
        <Table contactData={contact} removeCharacter={this.removeCharacter} toggleListReverse={this.toggleListReverse}/>
      </div>
    )
  }
}

export default App
import { Component } from "react";
import {
    Card,
    Page,
    DataTable
  } from "@shopify/polaris";
import './AdminPage.css';

  class AdminPage extends Component{
    state = {userData: [], showError: false }

    componentDidMount() {
     this.getUserDetails();
    }

    getUserDetails = async() => {

      const url = "http://localhost:3000/user-names"
      const options = {
        method: 'GET'
      }

      const response = await fetch(url, options)
      if(response.ok){
        const data = await response.json();
        const nestedUsernames = data.map(user => [user.username]);
        this.setState({userDate: nestedUsernames});
      }else{
        this.setState({showError: true})
      }  
    }

  render(){
    const {userData, showError} = this.state
    return (
      <div className="custom-table">
      <Page title="User Details">
        <Card>
          <DataTable
            columnContentTypes={[
              'text'
            ]}
            headings={[
              'Username'
            ]}
            rows={userData}
          />
        </Card>
      </Page>
      {showError && <div id="toast">Somethisg Went Wrong! <br /> Please Try Again!</div>}
      </div>
    );
  }
  
}
export default AdminPage
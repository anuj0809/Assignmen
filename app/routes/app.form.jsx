import {Component} from 'react'
import {
    Page,
  } from "@shopify/polaris";
import './form.css'

class FormPage extends Component{
      state = {username: '', showToast: false, showError: false}

  onchangeUsername = event => {
     this.setState(({username: event.target.value}));
  }


   onSubmitForm = async event => {
    event.preventDefault();
    const {username} = this.state
    const url = "http://localhost:3000/submit";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
          body: JSON.stringify({username})
        }

    const response = await fetch(url, options);

        if (response.ok) {
            this.setState({showToast: true})
        }else{
          this.setState({showError: true})
        }
  } 
  
render(){
  const {showToast, showError} = this.state
  return(
    <Page title="Form">
    <div className="login-page-container">
        <div className="login-page-sub-container">
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="username">
              USERNAME
            </label>
            <input
              type="text"
              className="username-input"
              placeholder="Username"
              id="username"
              onChange={this.onchangeUsername}
            />
            <button type="submit" className="login-button">
              Submit
            </button>
          </form>
        </div>
      </div>
      {showToast && <div id="toast">Form submitted successfully!</div>}
      {showError && <div id="toast">Something Went Wrong! <br /> Please Try Again!</div>}
    </Page>
)
}}
export default FormPage
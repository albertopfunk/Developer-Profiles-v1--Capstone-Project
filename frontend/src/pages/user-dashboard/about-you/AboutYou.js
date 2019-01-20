import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';

class AboutYou extends Component {
  state = {
    placesInterestedInput: "",
    placesAutocomplete: [],
    placesInterested: "",
    summary: "",
    topSkillsInput: "",
    topSkillsList: [],
    topSkills: "",
    additionalSkillsInput: "",
    additionalSkillsList: [],
    additionalSkills: "",
    familiarSkillsInput: "",
    familiarSkillsList: [],
    familiarSkills: "",
  }
  

  componentDidMount() {
    // for returning users
    // get data from session storage
    // hydrate state
    // remove from session storage
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // places interested
  onPlacesChange = (e) => {
    let newArr;
    var self = this;
    axios
    .post("https://developer-profiles.herokuapp.com/api/location", {inputLocation: e.target.value})
    .then(response => {
      newArr = response.data.predictions.map(location => {
        return {
          name: location.description,
          id: location.id
        };
      });
      self.setState({ placesAutocomplete: newArr });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({ [e.target.name]: e.target.value });
  }

  choosePlacesInterested = (e) => {
    let newplacesInterested;

    if (this.state.placesInterested === '') {
      newplacesInterested = '';
      newplacesInterested += e.target.value;
    } else {
      newplacesInterested = this.state.placesInterested.slice();
      newplacesInterested = newplacesInterested + ',' + e.target.value;
    }
    this.setState({ placesInterested: newplacesInterested, placesAutocomplete: [], placesInterestedInput: "" });
  }


  // top skills
  onTopSkillsChange = e => {
    let newArr;
    var self = this;
    axios
    .post("https://developer-profiles.herokuapp.com/api/skills", {skillInput: e.target.value})
    .then(response => {
      newArr = response.data.map(skill => skill);
      self.setState({ topSkillsList: newArr });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({ [e.target.name]: e.target.value });
  }

  chooseTopSkills = (e) => {
    let newtopSkills;

    if (this.state.topSkills.length === 0) {
      newtopSkills = '';
      newtopSkills += e.target.value;
    } else {
      newtopSkills = this.state.topSkills.slice();
      newtopSkills = newtopSkills + ',' + e.target.value;
    }
    this.setState({ topSkills: newtopSkills, topSkillsList: [], topSkillsInput: '' });
  }





  // additional skills
  onAdditionalSkillsChange = e => {
    let newArr;
    var self = this;
    axios
    .post("https://developer-profiles.herokuapp.com/api/skills", {skillInput: e.target.value})
    .then(response => {
      newArr = response.data.map(skill => skill);
      self.setState({ additionalSkillsList: newArr });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({ [e.target.name]: e.target.value });
  }
  
  chooseAdditionalSkills = (e) => {
    let newadditionalSkills;

    if (this.state.additionalSkills.length === 0) {
      newadditionalSkills = '';
      newadditionalSkills += e.target.value;
    } else {
      newadditionalSkills = this.state.additionalSkills.slice();
      newadditionalSkills = newadditionalSkills + ',' + e.target.value;
    }
    this.setState({ additionalSkills: newadditionalSkills, additionalSkillsList: [], additionalSkillsInput: '' });
  }


  // familiar skills
  onFamiliarSkillsChange = e => {
    let newArr;
    var self = this;
    axios
    .post("https://developer-profiles.herokuapp.com/api/skills", {skillInput: e.target.value})
    .then(response => {
      // skills will prob get unloaded by this point so you will only need to filter, like the search bar
      // same with all skills
      newArr = response.data.map(skill => skill);
      self.setState({ familiarSkillsList: newArr });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({ [e.target.name]: e.target.value });
  }
  
  chooseFamiliarSkills = (e) => {
    let newfamiliarSkills;

    if (this.state.familiarSkills.length === 0) {
      newfamiliarSkills = '';
      newfamiliarSkills += e.target.value;
    } else {
      newfamiliarSkills = this.state.familiarSkills.slice();
      newfamiliarSkills =newfamiliarSkills + ',' + e.target.value;
    }
    this.setState({ familiarSkills: newfamiliarSkills, familiarSkillsList: [], familiarSkillsInput: '' });
  }

  checkOnSubmit = (e) => {
    e.preventDefault()
    const { placesInterested, summary, topSkills, additionalSkills, familiarSkills } = this.state;
    const lePackage = {
      places: placesInterested,
      summary,
      top_skills: topSkills,
      add_skills: additionalSkills,
      familiar: familiarSkills
    }
    console.log(lePackage)
    axios.put(`https://developer-profiles.herokuapp.com/users/${this.props.userId}`, lePackage)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <MainFormContainer>
        <header>
          <h1>About You</h1>
        </header>
        <div className="container">
          <FormSection>
            <form onSubmit={this.checkOnSubmit}>

              <div>
                {/* places - Autocomplete from google - saves location ID */}
                {/* Multiple Inputs - Normalize for DB, string of place IDs */}
                <label htmlFor="userPlacesInterested">
                  Places Interested:
                </label>
                <br/>
                <input
                  type="text"
                  id="userPlacesInterested"
                  placeholder="Remote, Atlanta, Washington, San Francisco"
                  name="placesInterestedInput"
                  value={this.state.placesInterestedInput}
                  onChange={this.onPlacesChange}
                />
                {this.state.placesAutocomplete.length === 0 ?
                  null
                  :
                  this.state.placesAutocomplete.map(location => {
                    return (<option onClick={this.choosePlacesInterested} key={location.id} data-name="asd" value={location.id}>{location.name}</option>);
                  })
                }
              </div>

              
              <div>
                {/* summary - maybe not limit length, and just split it like lambda notes */}
                <label htmlFor="userSummary">
                  Summary:
                </label>
                <br/>
                <textarea
                  rows="4"
                  cols="50"
                  maxLength="128"
                  id="userSummary"
                  placeholder="This is 128 characters or so describing how
                  awesome I am and why you should like me. Similar
                  to what I put on my LinkedIn!"
                  name="summary"
                  value={this.state.summary}
                  onChange={this.onInputChange}
                />
              </div>
                
              <div>
                {/* topskills - Autocomplete from DB bucket already in state */}
                {/* Multiple Inputs - Normalize for DB, string of skill IDs */}
                <label htmlFor="userTopSkills">
                  Top Skills:
                </label>
                <br/>
                <input
                  type="text"
                  id="userTopSkills"
                  placeholder="Put 5 skills here, they are the biggest on your profile"
                  name="topSkillsInput"
                  value={this.state.topSkillsInput}
                  onChange={this.onTopSkillsChange}
                />
                {this.state.topSkillsList.length === 0 ?
                  null
                  :
                  this.state.topSkillsList.map(skill => {
                    return (<option onClick={this.chooseTopSkills} key={skill} value={skill}>{skill}</option>);
                  })
                }
              </div>
            
              <div>
                {/* addskills - Autocomplete from DB bucket already in state */}
                {/* Multiple Inputs - Normalize for DB, string of skill IDs */}
                <label htmlFor="userAdditionalSkills">
                  Additional Skills:
                </label>
                <br/>
                <input
                  type="text"
                  id="userAdditionalSkills"
                  placeholder="Put more skills here. They will be medium on your profile"
                  name="additionalSkillsInput"
                  value={this.state.additionalSkillsInput}
                  onChange={this.onAdditionalSkillsChange}
                />
                {this.state.additionalSkillsList.length === 0 ?
                  null
                  :
                  this.state.additionalSkillsList.map(skill => {
                    return (<option onClick={this.chooseAdditionalSkills} key={skill} value={skill}>{skill}</option>);
                  })
                }
              </div>
            
              <div>
                {/* familiar - Autocomplete from DB bucket already in state */}
                {/* Multiple Inputs - Normalize for DB, string of skill IDs */}
                <label htmlFor="userFamiliarSkills">
                  Familiar With:
                </label>
                <br/>
                <input
                  type="text"
                  id="userFamiliarSkills"
                  placeholder="Put remaining skills here. They will be small on your profile"
                  name="familiarSkillsInput"
                  value={this.state.familiarSkillsInput}
                  onChange={this.onFamiliarSkillsChange}
                />
                {this.state.familiarSkillsList.length === 0 ?
                  null
                  :
                  this.state.familiarSkillsList.map(skill => {
                    return (<option onClick={this.chooseFamiliarSkills} key={skill} value={skill}>{skill}</option>);
                  })
                }
              </div>

              <button type="submit">Save Info</button>
            </form>
          </FormSection>
          <section>
            <h3>Your Places Interested</h3>
            <h3>Your Top Skills</h3>
            <h3>Your Additional Skills</h3>
            <h3>Your Familiar Skills</h3>
          </section>
        </div>
      </MainFormContainer>
    )
  }
}

const MainFormContainer = styled.main`
  width: calc(100% - 300px);
  margin-left: 300px;
  margin-bottom: 100px;
  padding-top: 50px;
  padding-left: 100px;
  h1 {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
  }
  h3 {
    font-size: 2.8rem;
    color: rgb(42,42,42);
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    section {
      width: 43%;
    }
  }
`;

const FormSection = styled.section`
  div {
    margin-bottom: 30px;
  }
  label {
    margin-bottom: 5px;
  }
  input {
    padding: 15px;
    width: 90%;
    border: none;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background: white;
    background-color: rgba(255,255,255,.8);
  }
`;

export default AboutYou;

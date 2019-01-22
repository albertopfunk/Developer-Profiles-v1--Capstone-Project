import { PublicFacingPageDiv } from './PublicFacingPage.style'
import FilterBox from '../../components/Filter/filter'
import React, { Component } from 'react'
import UserCards from '../../components/user-card/UserCards';
import axios from 'axios';

class PublicFacingPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            filters: [],
            locatedDistance: 25,
            locatedCity: 'Denver',
            relocateCity: 'Albuquerque',
            updateRequired: false,
            loading: true,
            allUsers: [],
            modUsers: [],
        }
        this.toggleCheckMarks = this.toggleCheckMarks.bind(this)
    }

    componentDidMount(){
        axios.get('https://developer-profiles.herokuapp.com/users').then(response => {
            this.setState({
                allUsers: response.data, 
                modUsers: response.data, 
                loading: false
            })
            this.updateLength(this.state.modUsers.length)
        }).catch(error => {
            console.log(error)
        })
    }

    toggleCheckMarks(name){
        let newArr = this.state.filters
        if(newArr.includes(name)){
            let index = newArr.indexOf(name)
            newArr.splice(index, 1)
        } else {
            newArr.push(name)
        }
        this.setState({
            ...this.state, 
            [name]:!this.state[name], 
            updateRequired: true
        })
        this.filter()
    }

    updateLength = (num) => {
        this.setState({
            number: num
        })
    }

    filter = () => {
        let tempArr = this.state.allUsers.filter(item => {
            return this.state.filters.includes(item.filter)
        })
        if(tempArr.length === 0){
            tempArr = this.state.allUsers
        }
        console.log('filter')
        this.setState({
            modUsers: tempArr,
        })
        this.updateLength(tempArr.length)
    }

    render() { 
        console.log(this.state.modUsers.length)
        console.log(this.state.modUsers[0])
        return (
            <PublicFacingPageDiv>
                <FilterBox params={this.state} toggleCheckMarks={this.toggleCheckMarks} />
                <UserCards modUsers={this.state.modUsers} loading={this.state.loading} />
            </PublicFacingPageDiv> 
        );
    }
}
 
export default PublicFacingPage;
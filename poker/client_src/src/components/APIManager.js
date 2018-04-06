import axios from 'axios';


class APIManager{

    //Auth Token managing
    static getAuthToken(){
        if(this.authTokenId === undefined){
            return "0";
        }else{
            return this.authTokenId;
        }
    }
    static setAuthToken(id){
        this.authTokenId=id;
    }

    //User id managing
    static getUser(){
        if(this.userId === undefined){
            return "0";
        }else{
            return this.userId;
        }
    }
    static setUser(id){
        this.userId=id;
    }

    //User name managing
    static getUsername(){
        if(this.username === undefined){
            return "0";
        }else{
            return this.username;
        }
    }
    static setUserName(username){
        this.username=username;
    }

    //Registering
    static register(newUser){
        return axios.request({
            method:'post',
            url:'http://localhost:3000/api/users',
            data: newUser
        });
    }

    //Logging in
    static logIn(newUser){
        return axios.request({
            method:'post',
            url:'http://localhost:3000/api/users/login',
            data: newUser
        });
    }

    //Add tourney
    static addTourney(newGame){
        return axios.request({
            method:'post',
            url:'http://localhost:3000/api/games',
            data: newGame
        });
    }



}

export default APIManager;
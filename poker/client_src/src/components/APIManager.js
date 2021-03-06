import axios from 'axios';

// const url = "localhost";
const url = "137.194.8.91";
// const url = "137.194.89.126";

class APIManager {

  //Auth Token managing
  static getAuthToken() {
    if (this.authTokenId === undefined) {
      return "0";
    } else {
      return this.authTokenId;
    }
  }
  static setAuthToken(id) {
    this.authTokenId = id;
  }

  //User id managing
  static getUser() {
    if (this.userId === undefined) {
      return "0";
    } else {
      return this.userId;
    }
  }
  static setUser(id) {
    this.userId = id;
  }

  //Get user data
  static getUserData() {
    if(this.userId === undefined){
      return {};
    }else{
      return axios.request({
        method: 'get',
        url: 'http://' + url + ':3000/api/Users/' + this.getUser(),
        params: {
          access_token: APIManager.getAuthToken()
        }
      });
    }
  }

  //User name managing
  static getUsername() {
    if (this.username === undefined) {
      return "0";
    } else {
      return this.username;
    }
  }
  static setUserName(username) {
    this.username = username;
  }

  //Registering
  static register(newUser) {
    return axios.request({
      method: 'post',
      url: 'http://' + url + ':3000/api/users',
      data: newUser
    });
  }

  //Logging in
  static logIn(newUser) {
    return axios.request({
      method: 'post',
      url: 'http://' + url + ':3000/api/users/login',
      data: newUser
    });
  }

  //Logging out
  static logOut() {
    return axios.request({
      method: 'post',
      url: 'http://' + url + ':3000/api/users/logout',
      params: {
        access_token: APIManager.getAuthToken(),
      }
    });
  }

  //Add tourney
  static addTourney(newGame) {
    return axios.request({
      method: 'post',
      url: 'http://' + url + ':3000/api/games',
      data: newGame,
      params: {
        access_token: APIManager.getAuthToken()
      }
    });
  }

  //Get tourneys
  static getTourneys() {
    return axios.get(
      'http://' + url + ':3000/api/games'
    );
  }

  //Get tourney
  static getTourney(tourneyId) {
    return axios.get(
      'http://' + url + ':3000/api/games/' + tourneyId
    );
  }

  //Delete tourney
  static deleteTourney(tourneyId) {
    return axios.request({
      method: 'delete',
      url: 'http://' + url + ':3000/api/games/' + tourneyId
    });
  }

  //Patch tourney
  static patchTourney(tourneyId, tourneyData) {
    return axios.request({
      method: 'patch',
      url: 'http://' + url + ':3000/api/games/' + tourneyId,
      data: tourneyData
    });
  }

  static patchUser(userData) {
    return axios.request({
      method: 'patch',
      url: 'http://' + url + ':3000/api/Users/' + APIManager.getUser(),
      data: userData,
      params: {
        access_token: APIManager.getAuthToken()
      }
    });
  }

  //Add user tourney to player
  static addUserTourneyToPlayer(allUserTourneys) {
    return axios.request({
      method: 'patch',
      url: 'http://' + url + ':3000/api/Users/' + APIManager.getUser(),
      data: {userTourneys:allUserTourneys},
      params: {
        access_token: APIManager.getAuthToken()
      }
    });
  }

  static getUrl() {
    return url;
  }
}

export default APIManager;

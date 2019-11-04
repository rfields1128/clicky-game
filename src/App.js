import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

let score = 0;
let highScore = 0;

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends
  };

  clicker = id => {
    const friends = this.state.friends.map(friend => {
      if (friend.id === id && friend.clicked === false) {
        friend.clicked = true;
        score++
        console.log(friend)
      }
      else if (friend.id === id && friend.clicked === true) {
        alert("You lost..")
        if (score > highScore) {
          highScore = score
        }
        score = 0;
        this.gameOver();
      }
      return friend
    })
    console.log("clicked")
    console.log(friends)
    this.setState({ friends })
  };

  shuffle = id => {
    this.setState({
      friends: this.state.friends.sort(function (a, b) {
        return 0.5 - Math.random()
      })
    })
  }

  gameOver = () => {
    const friends = this.state.friends.map(friend => {
        friend.clicked = false;  
        return friend
    })
    this.setState({ friends })
  }


  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>Clicky Game</Title>
        <p>score: {score}</p>
        <p>highscore: {highScore}</p>
        {this.state.friends.map(friend => (
          <FriendCard
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            click={this.clicker}
            clicked={this.clicked}
            shuffle={this.shuffle}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;

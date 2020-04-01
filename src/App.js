import React, { Component } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import Cipher from "./XORCipher";
import './App.css';

const SECRET_KEY = "n2r3fn92rx92839x2398xe";

const ENCODE_SECONDS = 0;
const DECODE_SECONDS = 60;

class App extends Component {
  state = {
    content: "",
    result: "",
    secondsRemaining: ENCODE_SECONDS,
    timerRunning: false,
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer(seconds) {
    this.stopTimer();

    this.interval = setInterval(() => this.tick(), 1000);

    this.setState({ timerRunning: true, secondsRemaining: seconds });
  }

  stopTimer() {
    clearInterval(this.interval);
    this.setState({ timerRunning: false });
  }

  generateContent = (evt, shouldEncode) => {
    const {content} = this.state;
    if (!content) return;

    const result = shouldEncode 
      ? Cipher.encode(SECRET_KEY, content)
      : Cipher.decode(SECRET_KEY, content);

    this.setState({ result });

    shouldEncode
      ? this.startTimer(ENCODE_SECONDS)
      : this.startTimer(DECODE_SECONDS);
  }

  handleChange = (evt) => {
    const { name, value } = evt.target;

    this.setState({ [name]: value });
  }

  tick = () => {
    const { timerRunning, secondsRemaining } = this.state;

    if (!timerRunning) return;
    if (secondsRemaining <= 1)
      this.stopTimer();

    this.setState(state => ({
      secondsRemaining: state.secondsRemaining - 1
    }))
  }

  displayResult = () => {
    const { timerRunning, secondsRemaining, result } = this.state;

    if (timerRunning) 
      return <p className="countdown">{ secondsRemaining }</p>
    else if (secondsRemaining <= 0)
      return (
        <CopyToClipboard text={result} onCopy={this.handleCopy}>
          <p className="result">{result}</p>
        </CopyToClipboard>
      )
  }

  handleCopy = () => {
    alert("Text copied!");
  }

  render() {
    const { content } = this.state;

    return (
      <div className="container">
        <h1 className="heading">Cipher</h1>
  
        <input 
          className="content-input" 
          type="text" 
          name="content" 
          value={content} 
          onChange={this.handleChange}
        />
  
        <div className="btn__container">
          <button className="btn btn--encode" onClick={(evt) => this.generateContent(evt, true)}>
            Encode
          </button>
          <button className="btn btn--decode" onClick={(evt) => this.generateContent(evt, false)}>
            Decode
          </button>
        </div>

        { this.displayResult() }
      </div>
    );
  }
}

export default App;
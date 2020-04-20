import React, { Component } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import Cipher from "./XORCipher";
import './App.css';

const SECRET_KEY = "n2r3fn92rx92839x2398xe";
const DECODE_SECONDS = 5;

class App extends Component {
  state = {
    content: "",
    result: "",
    currentTime: undefined,
    endTime: undefined,
    timerRunning: false,
  }
  
  /* Lifecycle */
  componentWillUnmount() {
    this.stopDecodeTimer();
  }

  /* Methods */
  decode = (content) => {
    return Cipher.decode(SECRET_KEY, content);
  }

  encode = (content) => {
    return Cipher.encode(SECRET_KEY, content);
  }

  encodeContent = () => {
    this.stopDecodeTimer();
    this.setState({ endTime: new Date() });
    this.generateContent(true);
  }

  startDecodeTimer = () => {
    this.stopDecodeTimer();

    this.interval = setInterval(this.tick, 1000);

    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + (DECODE_SECONDS * 1000));

    this.setState({ timerRunning: true, currentTime, endTime });
  }

  stopDecodeTimer() {
    clearInterval(this.interval);
    this.setState({ timerRunning: false });
  }

  generateContent = (shouldEncode) => {
    const { content } = this.state;
    if (!content) return;

    const result = shouldEncode
      ? this.encode(content)
      : this.decode(content);

    this.setState({ result });
  }

  tick = () => {
    if (!this.state.timerRunning) return;

    if (this.getSecondsRemaining() <= 0) {
      this.stopDecodeTimer();
      this.generateContent(false);
    } else {
      this.setState({ currentTime: new Date() });
    }
  }

  getSecondsRemaining = () => {
    const currentTime = new Date();
    const { endTime } = this.state;
    const secondsRemaining = Math.round((endTime.getTime() - currentTime.getTime()) / 1000);

    return secondsRemaining;
  }

  handleChange = (evt) => {
    const { name, value } = evt.target;

    this.setState({ [name]: value });
  }

  displayResult = () => {
    // Timer not started
    if (!this.state.endTime) return;

    const secondsRemaining = this.getSecondsRemaining();
    const { timerRunning, result } = this.state;

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
          <button className="btn btn--encode" onClick={this.encodeContent}>Encode</button>
          <button className="btn btn--decode" onClick={this.startDecodeTimer}>Decode</button>
        </div>

        { this.displayResult() }
      </div>
    );
  }
}

export default App;
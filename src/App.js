import React, { Component } from 'react';
import Cipher from "./XORCipher";
import './App.css';

const SECRET_KEY = "n2r3fn92rx92839x2398xe";

class App extends Component {
  state = {
    content: "",
    result: ""
  }

  generateContent = (shouldEncode) => {
    const {content} = this.state;
    if (!content) return;

    const result = shouldEncode 
      ? Cipher.encode(SECRET_KEY, content)
      : Cipher.decode(SECRET_KEY, content);

    this.setState({ result });
  }

  handleChange = (evt) => {
    const { name, value } = evt.target;

    this.setState({ [name]: value });
  }

  render() {
    const { content, result } = this.state;

    return (
      <div className="container">
        <h1 className="heading">Cipher</h1>
  
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <input className="content-input" type="text" name="content" value={content} onChange={this.handleChange} />
        </div>
  
        <div className="buttons">
          <button className="btn btn--encode" onClick={() => this.generateContent(true)}>Encode</button>
          <button className="btn btn--decode" onClick={() => this.generateContent(false)}>Decode</button>
        </div>
  
        <p className="result">{result}</p>
      </div>
    );
  }
}

export default App;

/*
  function a() {
    var g = document.querySelector(".secret-input").value,
      h = document.querySelector(".content-input").value;
    c(XORCipher.encode(g, h));
  }
  function b() {
    var g = document.querySelector(".secret-input").value,
      h = document.querySelector(".content-input").value;
    c(XORCipher.decode(g, h));
  }
  function c(g) {
    f.textContent = g;
  }
  var d = document.querySelector(".btn--encode"),
    e = document.querySelector(".btn--decode"),
    f = document.querySelector(".results");
  d.addEventListener("click", function() {
    a();
  }),
    e.addEventListener("click", function() {
      b();
    });
})();
*/
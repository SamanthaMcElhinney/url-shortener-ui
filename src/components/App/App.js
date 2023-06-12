import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error: "",
    };
  }

  componentDidMount() {
    getUrls()
      .then((data) => {
        console.log(data);
        this.setState({ urls: data.urls });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  addLink = (inputs) => {
    postUrls(inputs)
      .then((data) => {
        this.setState({ urls: [...this.state.urls, data] });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  handleError = (errorMsg) => {
    this.setState({ error: errorMsg });
  };

  clearError = () => {
    this.setState({error: ''})
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addLink={this.addLink} error={this.handleError} clearError={this.clearError}/>
        </header>
        {this.state.error && <p className="error">{this.state.error}</p>}
        <UrlContainer urls={this.state.urls} k />
      </main>
    );
  }
}

export default App;

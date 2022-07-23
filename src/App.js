import React from 'react';

import './App.scss';

import { Cards, Chart, Country } from './components'

import { fetchData } from './api'

class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data: data });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });

    // console.log(fetchedData)
  }

  render() {
    const { data, country } = this.state;


    return (
      <div className="App">
        <Cards data={data} />
        <Country handleCountryChange={ this.handleCountryChange } />
        <Chart data={ data } country={ country } />
      </div>

    );
  }
}

export default App;

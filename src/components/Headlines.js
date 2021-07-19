import React from 'react';

class Headlines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      headlines: []
    };
  }

  componentDidMount() {
    this.makeApiCall()
  }

  render() {
    const { error, isLoaded, headlines } =this.state;
    if (error) {
      return <React.Fragment>Error: {error.message}</React.Fragment>;
    } else if (!isLoaded) {
      return <React.Fragment>Loading...</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          <h1>Headlines</h1>
          <ul>
            {headlines.map((headline, index) => 
            <li key={index}>
              <h3>{headline.title}</h3>
              <p>{headline.abstract}</p>
            </li>
            )}
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default Headlines;
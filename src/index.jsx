import React from 'react';
import { Container } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render(){
    return 
    <Container>
      <MainView />;
    </Container>
}
}

const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
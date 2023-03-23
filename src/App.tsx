import React from 'react';
import "./assets/styles/style.css"
import Hello from './components/component1';
import './style.scss';
function App() {
  return (
    <div>
      <Hello/>
      <h1>front end</h1>
    </div>
  );
}

class Apps  extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}

export default App;

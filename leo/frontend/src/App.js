import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import TurnoverContainer from './containers/TurnoverContainer';
import SearchContainer from './containers/SearchContainer';

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Container maxWidth="md">
          <SearchContainer />
          <TurnoverContainer />
        </Container>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;

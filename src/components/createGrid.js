import { Provider } from 'react-redux';
import store from '../store';
import createContext from './createContext';
import { DEFAULT_SCREEN_OPTIONS } from '../constants';

export default function grid(React) {
  const { Component, PropTypes } = React;
  const Context = createContext(React);

  class Grid extends Component {
    render() {
      const { options, children, ...clean } = this.props;
      const o = (options || DEFAULT_SCREEN_OPTIONS);

      return (
        <Provider store={store(o)}>
          <div>
            <Context options={o} {...clean}/>
            {children}
          </div>
        </Provider>
      );
    }
  }

  Grid.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      gutter: PropTypes.number,
      margin: PropTypes.number,
      columns: PropTypes.number,
      query: PropTypes.string.isRequired
    })),
    children: PropTypes.any
  };

  return Grid;
}

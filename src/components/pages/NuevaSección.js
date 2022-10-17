import React, { useState } from 'react';
import FancyInput from '../small/FancyInput';

const useInputState = initialValue => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: event => setValue(event.target.value),
  };
};




const NuevaSección = (props) => {
  const input = useInputState('');
  return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', props.nombre),
  React.createElement('ul', /* ... ul children ... */)
);
};
export default NuevaSección;




/*export function Welcome(props) {
  return <div>Bienvenido, señor {props.nombre}</div>;
}

ReactDOM.render(<Welcome nombre="Julián" />, document.getElementById('react-app'));
*/

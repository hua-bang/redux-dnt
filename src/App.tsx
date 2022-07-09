import { useState } from 'react';
import ReduxExample from './pages/ReduxExample';

function App() {
  const [show, setShow] = useState(true);

  return (
    <div className="App">
      { show && <ReduxExample /> }
      <button onClick={() => { setShow(prev => !prev) }}>toggle</button>
    </div>
  )
}

export default App

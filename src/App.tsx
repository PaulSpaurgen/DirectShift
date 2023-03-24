import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from './Components/Dashboard';
import "./App.css"

function App() {
  return (
    <div className="App" style={{
      fontFamily:"roboto"
    }}>
        <Dashboard/>
    </div>
  );
}

export default App;

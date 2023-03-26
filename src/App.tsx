import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from './Components/Dashboard';
import Box from "@mui/material/Box";

import "./App.css"

function App() {
  return (
    <Box className="App" style={{
      fontFamily:"roboto"
    }}>
        <Dashboard/>
    </Box>
  );
}

export default App;

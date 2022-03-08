import './App.css';
import Box from '@mui/material/Box';
import Example1 from "./DataFetching";
import Example2 from "./Mutation";
import Example3 from "./Pagination2";

function App() {
  return (
    <div className="App">
      <Box sx={{ display: "flex" }} p={5} justifyContent="center">
        <Example1 />
        {/* <Example2 /> */}
        {/* <Example3 /> */}
      </Box>
    </div>
  );
}

export default App;
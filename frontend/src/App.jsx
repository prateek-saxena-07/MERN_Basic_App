import { Box,useColorModeValue } from "@chakra-ui/react"
import CreatePage from "./components/pages/CreatePage";
import HomePage from "./components/pages/HomePage";
import NavBar from "./components/NavBar";
import { Routes ,Route } from 'react-router-dom'



function App() 
{
  return (
    <Box minH={"100vh"} bg={useColorModeValue('gray.100','gray.900')}>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
      </Routes>
    </Box>
  )
}
  

export default App

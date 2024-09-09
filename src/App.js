
import Header from './Components/Header/header.jsx'
import Footer from './Components/Footer/footer.jsx'
import Main from './Components/Main/main.jsx'
import './Assets/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className='App'>
      <Header/>
      <Footer/>
      <Main/>
    </div>
  );
}

export default App;

import ContactInfo from "./components/ContactInfo/ContactInfo";
import FormSection from "./components/Form/Form";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='app'>
    <FormSection />
    <ContactInfo />
    </div>
  );
}

export default App;

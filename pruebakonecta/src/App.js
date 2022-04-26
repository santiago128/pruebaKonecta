import './App.css';
import Header from './components/content/header/Header';
import Content from './components/content/Content';

export default function App() {


  return (
    <div className="sidebar-mini">
        <div className="wrapper">
          <Header/>
          <Content/>

        </div>
    </div>
  );
}
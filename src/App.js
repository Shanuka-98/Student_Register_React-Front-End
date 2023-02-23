import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddStudent from "../src/pages/AddStudent";
import ViewStudent from "../src/pages/ViewStudent";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add-student" component={AddStudent} />
          <Route path="/view-student" component={ViewStudent} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

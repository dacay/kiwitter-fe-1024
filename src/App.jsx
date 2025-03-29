import "./App.css";
import { Switch, Route } from "react-router-dom";
import PageLayout from "./pages/layouts/PageLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from 'react-toastify';

import './utils/devserver.js';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          {/* /?variant=most_liked */}
          <PageLayout>Home</PageLayout>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/profile/:nick">
          <PageLayout>Profile page</PageLayout>
        </Route>
        <Route path="/detail/:twitId">
          <PageLayout>Twit detail</PageLayout>
        </Route>
      </Switch>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import { useState } from "react";
import { Link } from "react-router-dom";
import Best_slide from "./routes/Best_slide";

function App() {
  const [tabs, setTab] = useState("home");

  const clickTab = (tabName) => {
    setTab(tabName);
  };

  return (
    <Router>
      <div className="">
        <nav>
          <ul>
            <li
              className={tabs === "home" ? "clickFunction" : ""}
              onClick={() => clickTab("home")}
            >
              <Link to="/">Home</Link>
            </li>

            <li>두번째 메뉴</li>

            <li>세번째 메뉴</li>
          </ul>
        </nav>
        <div className="hr_bar"></div>
      </div>

      <Switch>
        <Route path="/Movie/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Best_slide />
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

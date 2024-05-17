import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListPage from "../views/pages/ListPage.jsx";
import CreatePage from "../views/pages/CreatePage.jsx";
import SignupPage from '../views/pages/SignupPage .jsx';

const Web = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListPage />}/>
                <Route path="/token={token} setToken={setToken}signup" element={<SignupPage />}/>
                <Route path="/create" element={<CreatePage />}/>
            </Routes>
        </BrowserRouter>
    );
};
export default Web;

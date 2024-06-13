import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./App";
import Catalogu from "./faqet/Catalogu";
import Favorites from "./faqet/Favourite";
import SignUp from "./faqet/SignUp";
import SignIn from "./faqet/SignIn";

import Admin from "./faqet/adminPage";
import Detailed from "./faqet/Detailed";
import NotFound from "./faqet/NotFound";
import DetailedStore from "./faqet/DetailedStore";
import SigninAdministrator from  "./faqet/SignInAdmin";
import Man from "./faqet/Man"
import CartPage from "./faqet/CartPage";
import Type from "./faqet/Type";
import Female from "./faqet/Female";
import Kids from "./faqet/Kids";
import SearchResults from "./faqet/SearchResults";
function MultiPages() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/store" element={<Catalogu />} />
                <Route path="/fav" element={<Favorites />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/detail" element={<Detailed />} />
                <Route path="/detailStore" element={<DetailedStore />} />
                 <Route path="/signinAdministrator" element={<SigninAdministrator />} />
                 <Route path="/cartPage" element={<CartPage />} />
                 <Route path="/man" element={<Man />} />
                 <Route path="/female" element={<Female />} />
                 <Route path="/kids" element={<Kids />} />
                 <Route path="/search-results" element={<SearchResults />} />

                 <Route path="/MoreCategories" element={<Type />} />



                <Route path="*" element={<NotFound />} />

            </Routes>
        </Router>
    );
}
 
export default MultiPages;

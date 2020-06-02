import React from "react";

import Movies from "../containers/movies";
import { Category } from "../containers/models";

// import Trending from "./containers/movies/popular";
// import Upcoming from "./containers/movies/upComing";
// import TopRatedMovies from "./containers/movies/topRated";

export default () => (
  <>
    <Movies category={Category.POPULAR} title="Popular" />
    <Movies category={Category.TOP_RATED} title="Top Rated" />
    <Movies category={Category.UP_COMING} title="Up Coming" />
  </>
);

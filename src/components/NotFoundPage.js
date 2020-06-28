import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div>
    404 Page Not Found{" "}
    <Link to="/" className="initial">
      Main
    </Link>
  </div>
);

export default NotFoundPage;

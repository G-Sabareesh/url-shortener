import React, { useContext } from "react";
import ListContent from "./ListContent";
import UrlContext from "../DataContent/UrlContext";

const List = () => {
  const {shortenLinks} = useContext(UrlContext)

  return (
    <div className="container d-flex align-items-center justify-content-start flex-column col-sm-8 h-50 p-2 overflow-y-auto overflow-x-hidden gap-3">
      {/* {shortenLinks.map((item, index) => ( */}
        {/* <ListContent key={index} item = {item} /> */}
    {/* ))} */}
    </div>
  );
};

export default List;

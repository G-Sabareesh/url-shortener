import React from "react";
import ListContent from "./ListContent";

const List = () => {
  return (
    <div className="container d-flex align-items-center justify-content-start flex-column col-sm-8 h-50 p-2 overflow-y-auto overflow-x-hidden gap-3">
      <ListContent />
    </div>
  );
};

export default List;

import React from "react";
import ListContent from "./ListContent";

const List = () => {
  return (
    <div className="d-flex align-items-center justify-content-start col-lg-8 col-md-10 col-12 h-50 p-2 flex-column overflow-auto gap-3">
        <ListContent />
        <ListContent />
        <ListContent />
        <ListContent />
    </div>
  );
};

export default List;

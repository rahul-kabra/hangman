import React from "react";
import "./Category.css";

import * as Constants from "./Constants";

class Category extends React.Component {
  handleClick(e) {
    let val = e.currentTarget.textContent;
    this.props.clickHandle(val);
  }

  render() {
    let categoryList = this.props.categoryList;
    return (
      <>
        {categoryList.map((category) => {
          return (
            <div
              key={"category_" + category}
              id={"category_" + category}
              className={`category ${
                this.props.gameState === "initial" ||
                this.props.gameState === "end"
                  ? null
                  : this.props.categoryComplete.includes(category)
                  ? "completed-category"
                  : this.props.isCategoryClicked === category
                  ? "selected-category"
                  : null
              }`}
              onClick={(e) => {
                this.handleClick(e);
              }}
            >
              <label className="single-category">
                {category + Constants.getEmoji(category)}
              </label>
            </div>
          );
        })}
      </>
    );
  }
}

export default Category;
import React, { Component } from 'react';
import classes from './Order.css';




const order = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
      </li>
    )})
    
    return (
      <div className={classes.Order}>
        <p>Ingredients: </p>
          {ingredientSummary}
        <p>Price: <strong>{props.price}</strong></p>
      </div>
    )
}
 
export default order;
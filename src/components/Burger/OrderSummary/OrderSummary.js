import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
import { Link } from 'react-router-dom';

class OrderSummary extends Component {
  componentWillUpdate() {
    
  }

  render() {
    const queryIngredients = [];
    for (let param of Object.entries(this.props.ingredients)) {
      queryIngredients.push(`${param[0]}=${param[1]}&`)
    }
    // console.log(queryIngredients.join('').slice(0,-1).toString());
    // const queryIngredients = Object.entries(this.props.ingredients) 
    //   .map(entry => {
    //     return (
    //     )
    //   })
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
      </li>
    )})
    // console.log('ORDER SUMMARY: ', this.props.ingredients)
    return (
      <Aux>
        <h3>Your Order</h3>
        <span><small>Price total: ${this.props.price.toFixed(2)}</small></span>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Link to={{
          pathname: '/checkout',
          search: queryIngredients.join('').slice(0,-1).toString()
          }}>
          <Button btnType="Success">CONTINUE</Button>
        </Link>
      </Aux>
    );
  }
};
 
export default OrderSummary;
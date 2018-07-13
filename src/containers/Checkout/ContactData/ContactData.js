import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: '',
        valid: true
      },

    },
    validForm: false,
    loading: false
  }


  //On form submit
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    //Get form fields as keys and set them equal as values to user input
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
      })
      .catch(error => {
        this.setState({loading: false});
      })
    alert('You continue!');
  }

  checkValidity(value, rules) {
    let isValid = true;

    if ( rules && rules.required ) {
      isValid = value.trim() !== '' && isValid; //Set to valid if not equal to empty string
    }

    if (rules && rules.minLength) {
      isValid = value.length >= rules.minLength && isValid; //Validate min and previous must be true
    }

    if (rules && rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid; //Validate max and previous must be true
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {...this.state.orderForm};//Only performs shallow copy for children objects, state needs to be immutable
    let validForm = true;
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]  //Child spread operator for deep copy
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    for (let formElementIdentifier in updatedOrderForm) {
      console.log('[Field validation] ', updatedOrderForm[formElementIdentifier], ' is ', updatedOrderForm[formElementIdentifier].valid)
        if (!updatedOrderForm[formElementIdentifier].valid) {
            validForm = false;
        }
    }
    this.setState({
      orderForm: updatedOrderForm,
      validForm: validForm});
  }

  render() { 
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (<form onSubmit={this.orderHandler}>
      {formElementsArray.map(formElement => (
        <Input 
          key={formElement.id}
          elementType={formElement.config.elementType} 
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="Success" disabled={!this.state.validForm}>ORDER</Button>
    </form>);
    if (this.state.loading) {
      form = <Spinner />
    }
    return ( 
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
     )
  }
}
 
  const mapStateToProps = state => {
    return {
      ings: state.ingredients,
      price: state.totalPrice
    }
  }

export default connect(mapStateToProps)(ContactData);

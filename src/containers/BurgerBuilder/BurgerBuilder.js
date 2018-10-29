import React , { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    // Check ob mindesten eine Zutat hinzugefügt wurde
    updatePurchaseState (ingredients) {
        // Object.keys() erstellt ein Array bestehen aus den Keys des Object hier zB [salad, bacon, cheese, meat]...
        // const sum ist jetzt entweder null wenn keine Zutaten vorhanden sind oder alle Zutaten zusammen genommen als Menge
        const sum = Object.keys(ingredients)
                    // Map durch den Array und returned die Anzahl der Zutaten hier zB "return ingredients[igKey] = this.state.ingredients.salad"
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    // reduce() ob das Array mit mehreren Nummern in eine eizige Zahl zusammen zu fasse
                    .reduce((sum, el) => {
                        return sum + el
                    }, 0);
                    // set the state to true or false
                    this.setState({purchaseable: sum >0})
    };

    // Zutaten hinzufügen und den Preis neu berechnen
    addIngredientHandler = (type) => {
        // State in variable speichern
        const oldCount = this.state.ingredients[type];
        // Füge + 1 hinzu
        const updatedCount = oldCount +1;
        // Kopier altes State zu einem neuen und füge es später wieder zurück (immutable)
        const updatedIngredients = {
            ...this.state.ingredients
        };
        // State Copy mit neuer Property
        updatedIngredients[type] = updatedCount;
        // Preis bestimmen
        const priceAddition = INGREDIENT_PRICES[type];
        // State in variable speichern
        const oldPrice = this.state.totalPrice;
        // Addieren
        const newPrice = oldPrice + priceAddition;
        // State aktualiseren
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    // Zutaten löschen und Preis neu berechnen
    removeIngredientHandler = (type) => {
        // State in variable speichern
        const oldCount = this.state.ingredients[type];
        // Check ob ingredient => 1 ist
        if (oldCount <=0 ) {
            return;
        };
        // Subtrahiere  1 
        const updatedCount = oldCount - 1;
        // Kopier altes State zu einem neuen und füge es später wieder zurück (immutable)
        const updatedIngredients = {
            ...this.state.ingredients
        };
        // State Copy mit neuer Property
        updatedIngredients[type] = updatedCount;
        // Preis bestimmen
        const priceDeduction = INGREDIENT_PRICES[type];
        // State in variable speichern
        const oldPrice = this.state.totalPrice;
        // Subtrahieren
        const newPrice = oldPrice - priceDeduction;
        // State aktualiseren
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        alert('You continue!');
    };

    render() {
        // Blende Buttons aus wenn keine Zutaten vorhanden sind
        // Kopier State in immutable way
        const disabledInfo = {
            ...this.state.ingredients
        };
        // Loop though the copied state and return true or false depends if ingredients is <= 0
        // Beispiel Output: {salad: true, meat: false, cheese: false, bacon: true}
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchaseable={this.state.purchaseable}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler} />
            </>
        );
    }
};

export default BurgerBuilder;
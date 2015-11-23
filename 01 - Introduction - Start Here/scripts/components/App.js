/*
App
*/

import React from 'react';
import Catalyst from 'react-catalyst';

import Fish from './Fish';
import Inventory from './Inventory';
import Order from './Order';
import Header from './Header';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://learn-react-fazah.firebaseio.com/');

var App = React.createClass({
    // native react function (component specs)
    mixins : [Catalyst.LinkedStateMixin],
    getInitialState : function(){
        return {
            fishes : {},
            order : {}
        }
    },
    // native react function
    componentDidMount : function(){
        // takes 2 args: firebase path to sync with & object
        base.syncState(this.props.params.storeId +'/fishes', {
            // this = App component
            context: this,
            state: 'fishes'
        });

        var localStorageRef = localStorage.getItem('order-'+this.props.params.storeId);

        if(localStorageRef){
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    },
    componentWillUpdate : function(nextProps, nextState){
        localStorage.setItem('order-'+this.props.params.storeId, JSON.stringify(nextState.order));
    },
    addToOrder : function(key){
        this.state.order[key] = this.state.order[key] + 1 || 1;
        this.setState({
            order: this.state.order
        });
    },
    removeFromOrder : function(key){
        delete this.state.order[key];
        this.setState({
            order: this.state.order
        });
    },
    addFish : function(fish){
        var timestamp = (new Date()).getTime();
        //update state
        this.state.fishes['fish-' + timestamp] = fish;
        //set the state
        this.setState({
            fishes: this.state.fishes
        });
    },
    removeFish : function(key){
        if (confirm("Are you sure you want to remove this fish")) {
            this.state.fishes[key] = null;
            this.setState({
                fishes : this.state.fishes
            });
        };
    },
    loadSamples : function(){
        this.setState({
            fishes: require('../sample-fishes')
        });
    },
    renderFish : function(key) {
        return (<Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
    },
    render : function(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline={"Fresh Seafood Market"}/>
                    <ul className="list-of-fishes">
                        {Object.keys(this.state.fishes).map(this.renderFish)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
                <Inventory fishes={this.state.fishes} addFish={this.addFish} loadSamples={this.loadSamples} linkState={this.linkState} removeFish={this.removeFish}/>
            </div>
        )
    }
});

export default App;

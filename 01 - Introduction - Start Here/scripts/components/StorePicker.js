/*
Store picker component
This will let us make <StorePicker/>
*/

import React from 'react';
import  { Navigation } from 'react-router';
import h from '../helpers';

var StorePicker = React.createClass({
    mixins : [Navigation],
    goToStore : function(event){
        event.preventDefault();
        // get data from input
        var storeId = this.refs.storeId.value;
        this.transitionTo('/store/' + storeId);
    },
    render : function(){
        var name = "Lauren";
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter a Store {name}</h2>
                <input type="text" ref="storeId" defaultValue={h.getFunName()} required/>
                <input type="submit"/>
            </form>
        )
    }
});

export default StorePicker;

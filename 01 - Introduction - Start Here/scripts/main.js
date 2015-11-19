var React = require('react');
var ReactDOM = require('react-dom');

/*
App
*/
var App = React.createClass({
    render : function(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                </div>
                <Order />
                <Inventory />
            </div>
        )
    }
})

/*
Header
 */
var Header = React.createClass({
    render : function(){
        console.log(this)
        return (
            <header className="top">
                <h1>Catch
                <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                </span>
                Day</h1>
                <h3 className="tagline">{this.props.tagline}</h3>
            </header>
        )
    }
})

/*
Order
*/
var Order = React.createClass({
    render : function(){
        return (
            <p>Order</p>
        )
    }
})

/*
Inventory
*/
var Inventory = React.createClass({
    render : function(){
        return (
            <p>Inventory</p>
        )
    }
})


/*
Store picker component
This will let us make <StorePicker/>
*/

var StorePicker = React.createClass({
    render : function(){
        var name = "Lauren";
        return (
            <form className="store-selector">
                <h2>Please Enter a Store {name}</h2>
                <input type="text" ref="storeId" required/>
                <input type="submit"/>
            </form>
        )
    }
})

ReactDOM.render(<App/>, document.querySelector('#main'));

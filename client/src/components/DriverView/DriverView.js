import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';




class DriverView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                par: {
                    value: '',
                },
                lastPar: {
                    value: '',
                },
                sold: {
                    value: '',                },
                shrink: {
                    value: '',
                },
                added: {
                    value: '',
                }
            }
        }

    }
    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            formControls: {
                ...this.state.formControls,
                [name]: {
                    ...this.state.formControls[name],
                    value
                }
            }
        });
    }
    formSubmitHandler = () => {
        console.dir(this.state.formControls)
    }

    render() {
        return (
            <div className="container">


                <form>
                    
                    <input type="text"
                        name="par"
                        
                        value={this.state.formControls.par.value}
                        onChange={this.changeHandler}
                    />
                    
                    <input type="text"
                        name="last par"
                        value={this.state.formControls.lastPar.value}
                        onChange={this.changeHandler}
                    />
                    
                    <input type="text"
                        name="sold"
                        value={this.state.formControls.sold.value}
                        onChange={this.changeHandler}
                    />
                    
                    <input type="text"
                        name="shrink"
                        value={this.state.formControls.shrink.value}
                        onChange={this.changeHandler}
                    />
                    
                    <input type="text"
                        name="added"
                        placeholder={this.state.formControls.added.placeholder}
                        value={this.state.formControls.added.value}
                        onChange={this.changeHandler}
                    />

                    <button onClick={this.formSubmitHandler}> Submit </button>
                </form>
            </div>
        );
    }
}




export default connect(mapStoreToProps)(DriverView);
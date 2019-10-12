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
                    placeholder: 'par'
                },
                lastPar: {
                    value: '',
                    placeholder: 'last par'
                },
                sold: {
                    value: '',
                    placeholder: 'sold'
                },
                shrink: {
                    value: '',
                    placeholder: 'shrink'
                },
                added: {
                    value: '',
                    placeholder: 'added'
                }
            }
        }

    }
    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            formControls: {
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
                        placeholder={this.state.formControls.par.placeholder}
                        value={this.state.formControls.par.value}
                        onChange={this.changeHandler}
                    />
                    
                    <input type="text"
                        name="last par"
                        placeholder={this.state.formControls.lastPar.placeholder}
                        value={this.state.formControls.lastPar.value}
                        onChange={this.changeHandler}
                    />
                    
                    <input type="text"
                        name="sold"
                        placeholder={this.state.formControls.sold.placeholder}
                        value={this.state.formControls.sold.value}
                        onChange={this.changeHandler}
                    />
                    
                    <input type="text"
                        name="shrink"
                        placeholder={this.state.formControls.shrink.placeholder}
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
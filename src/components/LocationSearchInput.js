import React, {Component} from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import {choiceCityLatLng} from '../actions/cities';
import {connect} from 'react-redux';

class LocationSearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: 'Liverpool',
        };
    };

    componentDidMount() {
        const {address} = this.state;
        if(address) {
            this.handleSelect(address);
        }
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => {
                return getLatLng(results[0]);
            })
            .then(data => {
                this.props.getCityData(data);
            })
            .catch(error => console.error('Error', error));
    };

    render() {

        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="autocomplete-root">
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input form-control',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}


export default connect(
    null,
    dispatch => ({
        getCityData: (value) =>{
            dispatch(choiceCityLatLng(value))
        }
    })
)(LocationSearchInput);
import React, { Component } from 'react';
import './SidePanel.css'
import Station from './Station.js';
import Search from './Search.js';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from "react-router-dom";
import StationService from '../services/StationService';

class SidePanel extends Component {
    constructor(props) {
        super(props);
        this.handleCloseStation = this.handleCloseStation.bind(this);
        this.stationService = new StationService();
        let station = null;
        let searchActive = true;
        if (props.match.params.destination) {
            station = this.stationService.getStationBySlug(props.match.params.destination);
            if (station) {
                searchActive = false;
            }
        }
        this.state = {
            searchActive: searchActive,
            station: station,
        }
    }

    componentDidUpdate(prevProps) {
        if (
            (!prevProps.match.params.destination && this.props.match.params.destination) || // first destination
            (prevProps.match.params.destination !== this.props.match.params.destination) // new destination
        ) {
            let station = this.stationService.getStationBySlug(this.props.match.params.destination);
            this.setState({
                searchActive: false,
                station: station
            });
        } else if (prevProps.match.params.destination && !this.props.match.params.destination) { // no destination anymore
            this.setState({
                searchActive: true,
                station: null,
            });
        }
    }

    handleCloseStation() {
        this.setState({
            searchActive: true
        });
    }

    render() {
        return (
            <Box pl={1} className="SidePanel">
                <Collapse in={this.state.searchActive}>
                    <Search onSearchChange={this.props.onSearchChange}></Search>
                </Collapse>
                { !this.state.searchActive &&
                    <Box m={2}>
                        <Box display="flex" justifyContent="flex-end">
                            <IconButton onClick={this.handleCloseStation}><CloseIcon /></IconButton>
                        </Box>
                        <Station station={this.state.station} />
                    </Box>
                }
            </Box>
        )
    }
}

export default withRouter(SidePanel);
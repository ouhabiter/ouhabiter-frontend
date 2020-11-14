import React, { Component } from 'react';
import TimeHelper from '../helpers/TimeHelper';
import TrainIcon from '@material-ui/icons/Train';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import TimerIcon from '@material-ui/icons/Timer';
import GroupIcon from '@material-ui/icons/Group';
import Box from '@material-ui/core/Box';
import PowerIcon from '@material-ui/icons/Power';
import NatureIcon from '@material-ui/icons/Nature';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import './Station.css';

class Station extends Component {
    render() {
        return (
            <div>
                { this.props.station &&
                    <div>
                        <div className="StationInformation">
                            <TrainIcon /><Box m={1}>{this.props.station.stationName}</Box>
                        </div>
                        <div className="StationInformation">
                            <LocationCityIcon /><Box m={1}>{this.props.station.cityName}</Box>
                        </div>
                        <div className="StationInformation">
                            <GroupIcon /><Box m={1}>{this.props.station.cityPopulation.toLocaleString()}</Box>
                        </div>
                        <div className="StationInformation">
                            <TimerIcon /><Box m={1}>{TimeHelper.hoursToTimeString(this.props.station.travelTime)}</Box>
                        </div>
                        {this.props.station.hasFiber &&
                            <div className="StationInformation">
                                <PowerIcon /><Box m={1}>Fibre</Box>
                            </div>
                        }
                        {this.props.station.hasPark &&
                            <div className="StationInformation">
                                <NatureIcon /><Box m={1}>Parc naturel</Box>
                            </div>
                        }
                        {this.props.station.hasMountains &&
                            <div className="StationInformation">
                                <FilterHdrIcon /><Box m={1}>Montagne</Box>
                            </div>
                        }
                        {this.props.station.hasCoastline &&
                            <div className="StationInformation">
                                <BeachAccessIcon /><Box m={1}>Plage</Box>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default Station;
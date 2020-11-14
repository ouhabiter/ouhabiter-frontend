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

class Station extends Component {
    render() {
        return (
            <div>
                { this.props.station &&
                    <div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <TrainIcon /><Box m={1}>{this.props.station.stationName}</Box>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <LocationCityIcon /><Box m={1}>{this.props.station.cityName}</Box>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <GroupIcon /><Box m={1}>{this.props.station.cityPopulation.toLocaleString()}</Box>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <TimerIcon /><Box m={1}>{TimeHelper.hoursToTimeString(this.props.station.travelTime)}</Box>
                        </div>
                        {this.props.station.hasFiber &&
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <PowerIcon /><Box m={1}>Fibre</Box>
                            </div>
                        }
                        {this.props.station.hasPark &&
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <NatureIcon /><Box m={1}>Parc naturel</Box>
                            </div>
                        }
                        {this.props.station.hasMountains &&
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <FilterHdrIcon /><Box m={1}>Montagne</Box>
                            </div>
                        }
                        {this.props.station.hasCoastline &&
                            <div style={{ display: "flex", alignItems: "center" }}>
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
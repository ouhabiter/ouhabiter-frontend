import React, { Component } from 'react';
import TimeHelper from '../helpers/TimeHelper';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';

class Station extends Component {
    render() {
        return (
            <div>
                <Typography variant="h5">Sélection</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell scope="row">Station</TableCell>
                                <TableCell align="right">{this.props.station.stationName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row">Ville</TableCell>
                                <TableCell align="right">{this.props.station.cityName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row">Temps de trajet</TableCell>
                                <TableCell align="right">{TimeHelper.hoursToTimeString(this.props.station.travelTime)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row">Population</TableCell>
                                <TableCell align="right">{this.props.station.cityPopulation.toLocaleString()}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default Station;
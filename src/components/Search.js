import React, { Component } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { Button } from '@material-ui/core';
import { CheckboxWithLabel } from 'formik-material-ui';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import {
    populationMarks,
    travelTimeMarks,
    populationSliderScale,
    travelTimeSliderScale,
    populationSliderText,
    travelTimeSliderText,
    populationSliderValue,
    travelTimeSliderValue,
} from '../helpers/SliderHelper';
import debounce from 'debounce';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { setSearch, getSearch } from '../helpers/SearchHelper';

const AutoSave = () => {
    const formik = useFormikContext();

    React.useEffect(() => {
        if (formik.values !== formik.initialValues) {
            formik.submitForm();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values]);
    return null;
}

const AVAILABLE_CITIES = [
    {name: "Paris", inseeCode: process.env.REACT_APP_PARIS_INSEE_CODE},
    {name: "Lyon", inseeCode: "69123"},
    {name: "Marseille", inseeCode: "13055"},
]

class Search extends Component {
    constructor(props) {
        super(props);
        let search = getSearch();
        search.travelTimeRange = [
          travelTimeSliderValue(search.minTravelTime),
          travelTimeSliderValue(search.maxTravelTime)
        ];
        search.populationRange = [
          populationSliderValue(search.minPopulation),
          populationSliderValue(search.maxPopulation)
        ];
        console.log(search);
        this.state = search;
    }

    onSliderChange(event, value, setFieldValue, field) {
        // use formik's setFieldValue to update form
        if (field === "travelTime") {
            setFieldValue("minTravelTime", travelTimeSliderScale(value[0]));
            setFieldValue("maxTravelTime", travelTimeSliderScale(value[1]));
            this.setState({travelTimeRange: value});
        } else {
            setFieldValue("minPopulation", populationSliderScale(value[0]));
            setFieldValue("maxPopulation", populationSliderScale(value[1]));
            this.setState({populationRange: value});
        }
    }

    // XXX feels like I shouldn't need to use the component's state for this
    onSelectChange(event, setFieldValue) {
        // use formik's setFieldValue to update form
        setFieldValue(event.target.name, event.target.value);
        this.setState({[event.target.name]: event.target.value}); // see computed property names
    }

    doSearch(values) {
        this.props.onSearchChange(values);
        setSearch(values);
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={this.state}
                    onSubmit={debounce((values) => {
                        this.doSearch(values);
                    }, 100)}
                >
                    {({
                        handleSubmit,
                        setFieldValue
                    }) => (
                            <Form onSubmit={handleSubmit} onChange={this.handleFormChange}>
                                <AutoSave />
                                <Box pb={2}>
                                    <Typography id="travel-time" gutterBottom>Départ</Typography>
                                    <FormControl variant="outlined" style={{ width: "95%" }}>
                                        <Select
                                            name="fromCityInseeCode"
                                            value={this.state.fromCityInseeCode}
                                            onChange={(event) => this.onSelectChange(event, setFieldValue)}
                                        >
                                            {AVAILABLE_CITIES.map((city) => {
                                                return (
                                                    <MenuItem value={city.inseeCode}>{city.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Typography id="travel-time" gutterBottom>Temps de trajet</Typography>
                                <Box m={2}>
                                    <Slider
                                        value={this.state.travelTimeRange}
                                        onChange={(event, value) => this.onSliderChange(event, value, setFieldValue, "travelTime")}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={travelTimeSliderText}
                                        min={travelTimeMarks[0].value}
                                        max={travelTimeMarks[travelTimeMarks.length-1].value}
                                        scale={(x) => travelTimeSliderScale(x)}
                                        marks={travelTimeMarks}
                                        style={{ width: "95%" }}
                                    />
                                </Box>
                                <Typography id="population" gutterBottom>Population</Typography>
                                <Box m={2}>
                                    <Slider
                                        value={this.state.populationRange}
                                        onChange={(event, value) => this.onSliderChange(event, value, setFieldValue, "population")}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={populationSliderText}
                                        min={populationMarks[0].value}
                                        max={populationMarks[populationMarks.length-1].value}
                                        scale={(x) => populationSliderScale(x)}
                                        marks={populationMarks}
                                        style={{ width: "95%" }}
                                    />
                                </Box>
                                <div style={{ display: "flex", marginTop: 10 }}>
                                    <div>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="hasFiber"
                                            Label={{ label: "Avec la fibre" }}
                                            disabled={false}
                                        /><br />
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="hasCountryside"
                                            Label={{ label: "À la campagne" }}
                                            disabled={false}
                                        /><br />
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="hasMountains"
                                            Label={{ label: "À la montagne" }}
                                            disabled={false}
                                        /><br />
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="hasCoastline"
                                            Label={{ label: "À la mer" }}
                                            disabled={false}
                                        /><br />
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="hasLake"
                                            disabled={false}
                                            Label={{ label: "Près d'un grand lac" }}
                                        /><br />
                                    </div>
                                    <div>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="noFiber"
                                            Label={{ label: "Sans la fibre" }}
                                            disabled={false}
                                        /><br />
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="noCountryside"
                                            Label={{ label: "En ville" }}
                                            disabled={false}
                                        /><br />
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="noMountains"
                                            Label={{ label: "Pas à la montagne" }}
                                            disabled={false}
                                        /><br />
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="noCoastline"
                                            Label={{ label: "Pas à la mer" }}
                                            disabled={false}
                                        /><br />
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="hasPark"
                                            Label={{ label: "Dans un parc naturel" }}
                                            disabled={false}
                                        /><br />
                                    </div>
                                </div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={false}
                                    style={{ marginTop: 10 }}
                                >Filtrer</Button>
                            </Form>
                        )}
                </Formik>
            </div>
        )
    }
}

export default Search;

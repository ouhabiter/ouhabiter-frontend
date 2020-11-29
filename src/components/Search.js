import React, { Component } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { Button } from '@material-ui/core';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
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
} from '../helpers/SliderHelper';
import debounce from 'debounce';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';


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
        this.state = {
            minTravelTime: 0,
            maxTravelTime: 20,
            travelTimeRange: [0, 20],
            minPopulation: 0,
            maxPopulation: 200,
            populationRange: [0, 200],
            fromCityInseeCode: AVAILABLE_CITIES[0].inseeCode,
        }
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
    onRadioChange(event, value, setFieldValue, field) {
        // use formik's setFieldValue to update form
        setFieldValue(event.target.name, value);
        this.setState({[event.target.name]: value}); // see computed property names
    }

    doSearch(values) {
        this.props.onSearchChange(values);
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={{
                        travelTime: this.state.travelTimeRange,
                        population: this.state.populationRange,
                        minTravelTime: this.state.minTravelTime,
                        maxTravelTime: this.state.maxTravelTime,
                    }}
                    onSubmit={debounce((values) => {
                        this.doSearch(values);
                    }, 200)}
                >
                {({
                    handleSubmit,
                    setFieldValue
                }) => (
                    <Form onSubmit={handleSubmit} onChange={this.handleFormChange}>
                        <AutoSave/>
                        <Typography id="from-city-insee-code" variant="h4" gutterBottom>Départ</Typography>
                        <Box pb={2}>
                            <RadioGroup
                                aria-label="from"
                                name="fromCityInseeCode"
                                value={this.state.fromCityInseeCode}
                                onChange={(event, value) => this.onRadioChange(event, value, setFieldValue)}
                            >
                                {AVAILABLE_CITIES.map((city) => {
                                    return (
                                        <FormControlLabel value={city.inseeCode} control={<Radio />} label={city.name} />
                                    )
                                })}
                            </RadioGroup>
                        </Box>
                        <Typography id="from-city-insee-code" variant="h4" gutterBottom>Arrivée</Typography>
                        <Typography id="travel-time" gutterBottom>Temps de trajet</Typography>
                        <Box m={2}>
                            <Slider
                                value={this.state.travelTimeRange}
                                onChange={(event, value) => this.onSliderChange(event, value, setFieldValue, "travelTime")}
                                valueLabelDisplay="auto"
                                valueLabelFormat={travelTimeSliderText}
                                min={this.state.minTravelTime}
                                max={this.state.maxTravelTime}
                                scale={(x) => travelTimeSliderScale(x)}
                                marks={travelTimeMarks}
                                style={{ width: "95%"}}
                            />
                        </Box>
                        <Typography id="population" gutterBottom>Population</Typography>
                        <Box m={2}>
                            <Slider
                                value={this.state.populationRange}
                                onChange={(event, value) => this.onSliderChange(event, value, setFieldValue, "population")}
                                valueLabelDisplay="auto"
                                valueLabelFormat={populationSliderText}
                                min={this.state.minPopulation}
                                max={this.state.maxPopulation}
                                scale={(x) => populationSliderScale(x)}
                                marks={populationMarks}
                                style={{ width: "95%"}}
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
                                /><br/>
                                <Field
                                    component={CheckboxWithLabel}
                                    type="checkbox"
                                    name="hasCountryside"
                                    Label={{ label: "À la campagne" }}
                                    disabled={false}
                                /><br/>
                                <Field
                                    component={CheckboxWithLabel}
                                    type="checkbox"
                                    name="hasMountains"
                                    Label={{ label: "À la montagne" }}
                                    disabled={false}
                                /><br/>
                                <Field
                                    component={CheckboxWithLabel}
                                    type="checkbox"
                                    name="hasCoastline"
                                    Label={{ label: "À la mer" }}
                                    disabled={false}
                                /><br/>
                                <Field
                                    component={CheckboxWithLabel}
                                    type="checkbox"
                                    name="hasLake"
                                    disabled={false}
                                    Label={{ label: "Près d'un grand lac" }}
                                /><br/>
                            </div>
                            <div>
                                <Field
                                    component={CheckboxWithLabel}
                                    type="checkbox"
                                    name="noFiber"
                                    Label={{ label: "Sans la fibre" }}
                                    disabled={false}
                                /><br/>
                                <Field
                                    component={CheckboxWithLabel}
                                    type="checkbox"
                                    name="noCountryside"
                                    Label={{ label: "En ville" }}
                                    disabled={false}
                                /><br/>
                                <Field
                                    component={CheckboxWithLabel}
                                    type="checkbox"
                                    name="noMountains"
                                    Label={{ label: "Pas à la montagne" }}
                                    disabled={false}
                                /><br/>
                                <Field
                                    component={CheckboxWithLabel}
                                    type="checkbox"
                                    name="noCoastline"
                                    Label={{ label: "Pas à la mer" }}
                                    disabled={false}
                                /><br/>
                                <Field
                                    component={CheckboxWithLabel}
                                    type="checkbox"
                                    name="hasPark"
                                    Label={{ label: "Dans un parc naturel" }}
                                    disabled={false}
                                /><br/>
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
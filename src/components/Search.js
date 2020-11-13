import React, { Component } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { Button, Typography } from '@material-ui/core';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';

const AutoSave = () => {
    const formik = useFormikContext();

    React.useEffect(() => {
        if (formik.values !== formik.initialValues) {
            formik.submitForm();
        }
    }, [formik.values]);
    return null;
}

class Search extends Component {
    doSearch(values) {
        this.props.onSearchChange(values);
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={{ travelTime: '', population: '' }}
                    onSubmit={(values) => {
                        this.doSearch(values);
                    }}
                >
                {({
                    handleSubmit
                }) => (
                    <Form onSubmit={handleSubmit} onChange={this.handleFormChange}>
                        <AutoSave/>
                        <Field
                            component={TextField}
                            type="number"
                            name="minTravelTime"
                            label="Temps de trajet minimal"
                            disabled={false}
                            style={{ width: "95%"}}
                        /><br/>
                        <Field
                            component={TextField}
                            type="number"
                            name="maxTravelTime"
                            label="Temps de trajet maximal"
                            disabled={false}
                            style={{ width: "95%"}}
                        /><br/>
                        <Field
                            component={TextField}
                            type="number"
                            name="minPopulation"
                            label="Population minimale"
                            disabled={false}
                            style={{ width: "95%"}}
                        /><br/>
                        <Field
                            component={TextField}
                            type="number"
                            name="maxPopulation"
                            label="Population maximale"
                            disabled={false}
                            style={{ width: "95%"}}
                        /><br/>
                        <div style={{ display: "flex", "margin-top": 10 }}>
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
                            style={{ "margin-top": 10 }}
                        >Filtrer</Button>
                    </Form>
                )}
                </Formik>
            </div>
        )
    }
}

export default Search;
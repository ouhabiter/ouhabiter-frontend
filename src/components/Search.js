import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class Search extends Component {
    doSearch(values) {
        this.props.onSearchChange(values);
    }

    render() {
        return (
            <div>
                <h2>Recherche</h2>
                <Formik
                    initialValues={{ travelTime: '', population: '' }}
                    onSubmit={(values) => {
                        this.doSearch(values);
                    }}
                >
                {({
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit}>
                        Durée de voyage maximale <Field type="number" name="maxTravelTime" /><br/>
                        Durée de voyage minimale <Field type="number" name="minTravelTime" /><br/>
                        Population maximale <Field type="number" name="maxPopulation" /><br/>
                        Population minimale <Field type="number" name="minPopulation" /><br/>
                        <button type="submit">Filtrer</button>
                    </form>
                )}
                </Formik>
            </div>
        )
    }
}

export default Search;
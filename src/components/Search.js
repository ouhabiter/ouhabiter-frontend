import React, { Component } from 'react';
import { Formik, Field } from 'formik';

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
                        Fibre <Field type="checkbox" name="hasFiber" /><br/>
                        Montagne <Field type="checkbox" name="hasMountains" /><br/>
                        Mer <Field type="checkbox" name="hasCoastline" /><br/>
                        Lac <Field type="checkbox" name="hasLake" /><br/>
                        <button type="submit">Filtrer</button>
                    </form>
                )}
                </Formik>
            </div>
        )
    }
}

export default Search;
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
                        Durée de voyage minimale (depuis Paris) <Field type="number" name="minTravelTime" /><br/>
                        Durée de voyage maximale (depuis Paris) <Field type="number" name="maxTravelTime" /><br/>
                        Population minimale <Field type="number" name="minPopulation" /><br/>
                        Population maximale <Field type="number" name="maxPopulation" /><br/>
                        Ville avec la fibre <Field type="checkbox" name="hasFiber" /><br/>
                        Ville sans la fibre <Field type="checkbox" name="noFiber" /><br/>
                        À la montagne <Field type="checkbox" name="hasMountains" /><br/>
                        Pas à la montagne <Field type="checkbox" name="noMountains" /><br/>
                        Sur la côte <Field type="checkbox" name="hasCoastline" /><br/>
                        Pas sur la côte <Field type="checkbox" name="noCoastline" /><br/>
                        À côté d'un grand lac<Field type="checkbox" name="hasLake" /><br/>
                        Campagne <Field type="checkbox" name="hasCountryside" /><br/>
                        En ville <Field type="checkbox" name="noCountryside" /><br/>
                        Dans un parc naturel <Field type="checkbox" name="hasPark" /><br/>
                        <button type="submit">Filtrer</button>
                    </form>
                )}
                </Formik>
            </div>
        )
    }
}

export default Search;
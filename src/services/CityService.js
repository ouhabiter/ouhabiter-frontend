import 'axios';
import axios from 'axios';

class CityService {
    static getCityOutline(cityInseeCode) {
        return axios({
            url: `https://geo.api.gouv.fr/communes/${cityInseeCode}`,
            params: {
                fields: 'contour',
                format: 'json',
                geometry: 'centre',
            }
        }).then((response) => {
            return response.data.contour;
        });
    }
}

export default CityService;
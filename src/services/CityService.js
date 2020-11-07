import axios from 'axios';

class CityService {
    static getImages(cityName) {
        return axios.get(`https://en.wikipedia.org/w/api.php?action=query&titles=${cityName}&format=json&prop=images&origin=*`)
            .then(res => {
                let pages = res.data.query.pages;
                let images = pages[Object.keys(pages)[0]].images;
                if (!images) {
                    return null;
                }
                let mainImage = images[0]['title'];
                if (mainImage.includes('Disambig_gray')) { // wikipedia returns this weird value when nothing is found
                    return null;
                }
                images.forEach(image => {
                    let title = image['title'];
                    if (
                            (
                                title.includes(cityName) &&
                                !title.includes('Blason') && // not interested in "Blason"
                                !title.includes('Flag') // not interested in "Flag"
                            ) ||
                            title.includes('Mairie')
                    ) {
                        mainImage = title;
                    }
                });
                return mainImage;
            })
            .then(mainImage => {
                if (!mainImage) {
                    return null;
                }
                return axios.get(`https://en.wikipedia.org/w/api.php?action=query&titles=${mainImage}&prop=imageinfo&format=json&iiprop=url&origin=*&iiurlwidth=500`)
                    .then(res => {
                        let pages = res.data.query.pages;
                        let imageinfo = pages[Object.keys(pages)[0]].imageinfo;
                        let mainImageUrl = imageinfo[0]['thumburl'];
                        return mainImageUrl;
                    })
            })
    }
}

    export default CityService;
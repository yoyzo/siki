const axios = require("axios")
import * as convert from "../utils/convertFunctions"

axios.interceptors.request.use(config => {
    config.headers['Accept-Encoding'] = 'null';
    return config;
});
export default class NetfilmProvider implements ProviderClass {
    name = "Netfilm";
    mainUrl = "https://net-film.vercel.app/api";
    language = "en";

    async homePage() {
        let finalList = new Array()
        await Promise.all([
            { "url": `${this.mainUrl}/home?page=0` },
            { "url": `${this.mainUrl}/home?page=1` },
            { "url": `${this.mainUrl}/home?page=2` }
        ].map(async json => {            
            const response = (await axios.get(json.url)).data.data.homeSections
            response.forEach(element => {
                let posts = element.homeMovies.map(el=> {
                    return convert.searchResponse(
                        el.title,
                        (el.category == 1) ? false : true,
                        btoa(`${this.mainUrl}/detail?category=${el.category}&id=${el.id}`),
                        el.imageUrl,
                        null,
                        null
                    )
                })
                finalList.push(convert.HomePage(element.homeSectionName, posts))
            });
        }))
        return finalList
    }
    async search(query) {
        const res = (await axios.get(`${this.mainUrl}/search?keyword=${query.replaceAll(" ", "%20")}&size=25`)).data
        return res.data.results.map((index, element) => {
            let value = res.data.results[element]
            return convert.searchResponse(
                value.name,
                (value.domainType == 1) ? false : true,
                btoa(`${this.mainUrl}/detail?category=${value.domainType}&id=${value.id}`),
                value.coverVerticalUrl,
                parseInt(value.releaseTime),
                parseFloat(value.sort)
            )
        })
    }
    async load(url: string): Promise<movieInterface | seriesInterface> {
        const res = (await axios.get(Buffer.from(url, 'base64').toString())).data.data
        const title = res.name
        const plot = res.introduction
        const year = parseInt(res.year)
        const posterUrl = res.coverHorizontalUrl
        const trailer = null
        if (res.category == 0) {
            return convert.movieResponse(
                title, 
                btoa(`${this.mainUrl}/episode?category=${res.category}&id=${res.id}&episode=${res.episodeVo[0].id}`), 
                posterUrl, 
                year, 
                plot, 
                trailer
            )
        } else {
            const episodes = res.episodeVo.map((index, element) => {
                return convert.Episode(
                    `Episode ${element.seriesNo}`,
                    btoa(`${this.mainUrl}/episode?category=${res.category}&id=${res.id}&episode=${res.episodeVo[element].id}`),
                    parseInt(element.seriesNo),
                    res.seriesNo,
                    res.coverHorizontalUrl,
                    null
                )
            })
            return convert.seriesResponse(title, url, posterUrl, year, plot, trailer, [convert.Season(res.seriesNo, episodes)])
        }
    }
    async loadLinks(data: any): Promise<Array<mediaLink>> {
        const res = (await axios.get(Buffer.from(data, 'base64').toString())).data.data
        return res.qualities.map((index, element) => {
            let el = res.qualities[element]
            return convert.mediaLink(
                "Netfilm",
                el.url,
                el.quality,
                res.subtitles.map(sub=> ({ name: sub.language, url: sub.url})),
                [],
                el.url.includes(".m3u8")
            )
        })
    }
}
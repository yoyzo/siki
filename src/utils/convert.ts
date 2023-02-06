export function HomePage(
    title: string,
    posts: Array<searchInterface>
): homeInterface {
    return { title, posts }
}
export function searchResponse(
    title: string,
    tvType: tvTypes,
    url: string,
    posterUrl: string,
    year: number,
    rating: number,
    genres: Array<string>,
    data: any
): searchInterface {
    return { title, tvType: {code: tvType, name: tvTypesToWord(tvType)}, url, posterUrl, year, rating, genres, data }
}
export function movieResponse(
    title: string,
    url: string,
    posterUrl: string,
    year: number,
    plot: string,
    trailer: string,
    genres: Array<string>,
    data: any
): movieInterface {
    return { title, url, posterUrl, year, plot, trailer, genres, tvType: {code: tvTypes.MOVIE, name: tvTypesToWord(tvTypes.MOVIE)}, data }
}
export function Episode(
    title: string,
    url: string,
    episode: number,
    season: number,
    thumbnail: string,
    plot: string,
    isDub: boolean,
    data: any,
): episodeInterface {
    return { title, url, episode, season, thumbnail, plot, isDub, data }
}
export function Season(
    season_number: number,
    episodes: Array<episodeInterface>
): seasonInterface {
    return { season_number, episodes }
}

export function seriesResponse(
    title: string,
    url: string,
    posterUrl: string,
    year: number,
    plot: string,
    trailer: string,
    genres: Array<string>,
    seasons: Array<seasonInterface>
): seriesInterface {
    return { title, url, posterUrl, year, plot, trailer, genres, tvType: {code: tvTypes.SERIES, name: tvTypesToWord(tvTypes.SERIES)}, seasons }
}
export function animeResponse(
    title: string,
    url: string,
    posterUrl: string,
    year: number,
    plot: string,
    trailer: string,
    genres: Array<string>,
    seasons: Array<seasonInterface>
): animeInterface {
    return { title, url, posterUrl, year, plot, trailer, genres, tvType: {code: tvTypes.ANIME, name: tvTypesToWord(tvTypes.ANIME)}, seasons }
}
export function mediaLink(
    title: string,
    url: string,
    quality: number,
    subtitles: Array<{language: string, url: string}>,
    headers: Array<Object>,
    isM3U8: boolean,
): mediaLink {
    return { title, url, quality, subtitles, headers, isM3U8 }
}
export function tvTypesToWord(tvType: tvTypes) {
    let types = {
        [tvTypes.MOVIE]: "Movie",
        [tvTypes.SERIES]: "TVSeries",
        [tvTypes.ANIME]: "Anime",
    }    
    return types[tvType]
}
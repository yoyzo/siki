export function HomePage(
    title: string,
    posts: Array<searchInterface>
): homeInterface {
    return { title, posts }
}
export function searchResponse(
    title: string,
    isMovie: boolean,
    url: string,
    posterUrl: string,
    year: number,
    rating: number
): searchInterface {
    return { title, isMovie, url, posterUrl, year, rating }
}
export function movieResponse(
    title: string,
    url: string,
    posterUrl: string,
    year: number,
    plot: string,
    trailer: string
): movieInterface {
    return { title, url, posterUrl, year, plot, trailer, isMovie: true }
}
export function Episode(
    title: string,
    url: string,
    episode: number,
    season: number,
    thumbnail: string,
    plot: string,
): episodeInterface {
    return { title, url, episode, season, thumbnail, plot }
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
    seasons: Array<seasonInterface>
): seriesInterface {
    return { title, url, posterUrl, year, plot, trailer, isMovie: false, seasons }
}
export function mediaLink(
    title: string,
    url: string,
    quality: number,
    headers: Array<Object>,
    isM3U8: boolean,
): mediaLink {
    return { title, url, quality, headers, isM3U8 }
}
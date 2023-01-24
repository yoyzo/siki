export { };

declare global {
    interface SikiClass {
        provider_name: string,
        homePage(): Promise<Array<homeInterface>>,
        search(query: string): Promise<Array<searchInterface>>,
        load(url: string): Promise<movieInterface | seriesInterface>,
        loadLinks(data: any): Promise<Array<mediaLink>>
    }
    interface ProviderClass {
        name: string,
        mainUrl: string,
        language: string,
        homePage(): Promise<Array<homeInterface>>,
        search(query: string): Promise<Array<searchInterface>>,
        load(url: string): Promise<movieInterface | seriesInterface>,
        loadLinks(data: any): Promise<Array<mediaLink>>
    }
    interface homeInterface {
        title: string,
        posts: Array<searchInterface>
    }
    interface searchInterface {
        title: string,
        isMovie: boolean,
        url: string,
        posterUrl: string,
        year: number,
        rating: number,
    }
    interface movieInterface {
        title: string,
        url: string,
        posterUrl: string,
        year: number,
        plot: string,
        trailer: string,
        isMovie: true
    }
    interface episodeInterface {
        title: string,
        url: string,
        episode: number,
        season: number,
        thumbnail: string,
        plot: string,
    }
    interface seasonInterface {
        season_number: number,
        episodes: Array<episodeInterface>
    }
    interface seriesInterface {
        title: string,
        url: string,
        posterUrl: string,
        year: number,
        plot: string,
        trailer: string,
        isMovie: false,
        seasons: Array<seasonInterface>
    }
    interface mediaLink {
        title: string,
        url: string,
        quality: number,
        headers: Array<Object>,
        isM3U8: boolean,
    }
}
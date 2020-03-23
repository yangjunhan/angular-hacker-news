export interface NewsItem {
    by: string;
    descendants: number;
    id: string;
    kids: Array<string>;
    score: number;
    time: string;
    title: string;
    type: string;
    url: string;
}

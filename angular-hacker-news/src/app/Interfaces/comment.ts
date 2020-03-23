export interface Comment {
    by: string;
    id: string;
    parent: string;
    text?: string;
    time: string;
    type: string;
    kids?: Array<string>;
    dead?: boolean;
    deleted?: boolean;
}

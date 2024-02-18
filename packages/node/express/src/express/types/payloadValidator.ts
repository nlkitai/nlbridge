export type PayloadValidator = <T>(payload: any) => {
    success: false;
    error: string;
} | {
    success: true;
    payload: T;
};

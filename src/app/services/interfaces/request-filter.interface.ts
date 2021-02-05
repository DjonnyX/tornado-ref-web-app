export interface IRequestFilter extends Array<{
    id: string;
    operation: 'INCLUDE' | 'EXCLUDE';
    value: string | number;
}> { }
export interface TBodyProps {
    data: any[];
    columns: any[];
    search: string;
}

export interface TableProps {
    data: any[];
}

export interface TableState {
    search: string,
    newData: any[],
    columns: any[]
}

export interface THeadProps {
    columns: any[],
    updateColumns: Function,
    onSort: Function,
    data: any[]
}

export interface LegendProps {
    columns: any[];
    handleToggleColumn: Function;
}

export interface SearchProps {
    handleSearch: Function;
    search: string;
}
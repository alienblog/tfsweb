export interface AuthInfo {
    access_token: string;
    token_type: string;
    expires_in: string;
    refresh_token: string;
}

export interface Profile {
    displayName: string;
    publicAlias: string;
    emailAddress: string;
    coreRevision: number;
    timeStamp: Date;
    id: string;
    revision: number;
}

export interface CountedResult<T> {
    count: number;
    value: Array<T>;
}

export interface Account {
    accountId: string;
    accountUri: string;
    accountName: string;
    organizationName: string;
    accountType: string;
    accountOwner: string;
    createdBy: string;
    createdDate: Date;
    accountStatus: string;
    lastUpdatedBy: string;
    properties: any[];
    lastUpdatedDate: Date;
}

export interface Result<T> {
    data: T;
    error: any;
}

import {Injectable} from 'angular2/core';
import {Http, RequestOptionsArgs, Headers } from 'angular2/http';
import {AuthInfo, Profile, CountedResult, Account, Result} from './app.models';

class Client {
    private authInfo: AuthInfo;

    constructor(public http: Http) {
        this.authInfo = {
            "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJuYW1laWQiOiJlOGY0ZjgyZC0yNjIzLTRjZWYtYTFiOC0xZDI3YzIyOWE4MzAiLCJzY3AiOiJ2c28uYnVpbGQgdnNvLmNoYXRfd3JpdGUgdnNvLmNvZGUgdnNvLmNvZGVfc3RhdHVzIHZzby5leHRlbnNpb24gdnNvLmV4dGVuc2lvbi5kYXRhIHZzby5sb2FkdGVzdCB2c28ucGFja2FnaW5nIHZzby5wcm9qZWN0IHZzby53b3JrIiwiaXNzIjoiYXBwLnZzc3BzLnZpc3VhbHN0dWRpby5jb20iLCJhdWQiOiJhcHAudnNzcHMudmlzdWFsc3R1ZGlvLmNvbSIsIm5iZiI6MTQ2MDk5NzUxMywiZXhwIjoxNDYxMDAxMTEzfQ.HooyqJFHyu_StpEPO6EhzazSlS22Bty6UWQsEFYztjZLG3wP-J77WRvsTx2Wbk9vJoj8JPM-R-mridxEB2W9RQMSeHm626u4mAzyTYdLc-EQWlmV19jZ63BWI_iOsp0CfuiNtO3s3cilElJXIp9x2_A48nd_W7lIJfobuo_i3kqAkUt3Cf5_LRKmw-7Laco4eJPrA5-hvr8Jav5IXCfTV-QKy4fHyBtUleMt-6zjrN0P-2OSdY0MepkeuH0ELgyWTcOYpgvQYSY36cirkRMikgxFrgjRuchL7myRFEJT6DzWYDE7HiREknSIhMAMA027DnfWLu3bT0720w_7SfcqMQ",
            "token_type": "jwt-bearer",
            "expires_in": "3599",
            "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJuYW1laWQiOiJlOGY0ZjgyZC0yNjIzLTRjZWYtYTFiOC0xZDI3YzIyOWE4MzAiLCJhY2kiOiJmZDEyNTViZC1iNWE3LTRlNTUtOGM2MS03Y2JjMWMwMDA3MDkiLCJzY3AiOiJ2c28uYnVpbGQgdnNvLmNoYXRfd3JpdGUgdnNvLmNvZGUgdnNvLmNvZGVfc3RhdHVzIHZzby5leHRlbnNpb24gdnNvLmV4dGVuc2lvbi5kYXRhIHZzby5sb2FkdGVzdCB2c28ucGFja2FnaW5nIHZzby5wcm9qZWN0IHZzby53b3JrIiwiaXNzIjoiYXBwLnZzc3BzLnZpc3VhbHN0dWRpby5jb20iLCJhdWQiOiJhcHAudnNzcHMudmlzdWFsc3R1ZGlvLmNvbSIsIm5iZiI6MTQ2MDk5NzUxMywiZXhwIjoxNDkyNTMzNTEzfQ.L6TA34cnsP9rYMmLruB4sx08RFqRx1y7FUrW33lkGfUlinQJWVoDXu3jvue4vwJILiSrK-D5nV0ow1lREwJcOK4qq_v_YHI-66_63h0m6l_2G7T2g3YEb0okDy68FupPBFqlBMZSzzqPqpLyRn0qt2lfEMcVdcAiQMMJsmmBm_AXdD73p8LB3KFUspQJrO4YzggSSigi3XUPB9nTVA0ChGX4h3L8DS7RNBIJbcSh9jr2To1biHnNJ7BrxJC3mOuXDXJVI40iQK4vadey9N_q0IE2g_QK1W8Huh63a5m-gWJjy9XLgut0pgJTbOoGaKj18tOp5Ssrn1m-PsSD3J0flg"
        }
    };

    setAuth(authInfo: AuthInfo) {
        this.authInfo = authInfo;
    };

    get<T>(url: string, options?: RequestOptionsArgs, addAuthHeader: boolean = true) {
        if (addAuthHeader) {
            options = options || {};
            options.headers = options.headers || new Headers();
            options.headers.set('Authorization', 'Bearer ' + this.authInfo.access_token);
        }

        let req = this.http.get(url, options)
            .map(result => <T>result.json());
        return function(cb: (error: any, T: T) => void) {
            req.subscribe(
                results => cb(undefined, results)
                , error => cb(error, undefined)
            );
        };
    }
};

@Injectable()
export class TFSService {
    currentUser: Profile;
    private client: Client;

    private apiBaseUrl = 'https://app.vssps.visualstudio.com/_apis/';


    constructor(http: Http) {
        this.client = new Client(http);
    }

    app = {
        getAuth: () => {
            let url = '/getUser';
            this.client.get<Result<AuthInfo>>(url)((error, result) => {
                if (error || result.error) {
                    window.location.href = '/connect/visualstudio';
                    return;
                }
                this.client.setAuth(result.data);
            });
        }
    };

    user = {
        getProfile: (cb: (err: any, result: Profile) => void) => {
            let url = this.apiBaseUrl + 'profile/profiles/me?api-version=1.0';
            this.client.get<Profile>(url)((error, result) => {
                if (error) {
                    console.log(error);
                    cb(error, undefined);
                    return;
                }

                console.log(result);
                this.currentUser = result;
                cb(null, result);
            });
        },

        getMemberAccounts: (cb: (err: any, result: CountedResult<Account>) => void, id?: string) => {
            id = id || this.currentUser.id;
            let url = this.apiBaseUrl + 'Accounts?memberId=' + id + '&api-version=1.0';
            this.client.get<CountedResult<Account>>(url)(cb);
        },

        getOwnedAccounts: (cb: (err: any, result: CountedResult<Account>) => void, id?: string) => {
            id = id || this.currentUser.id;
            let url = this.apiBaseUrl + 'Accounts?ownerId=' + id + '&api-version=1.0';
            this.client.get<CountedResult<Account>>(url)(cb);
        }
    };
}
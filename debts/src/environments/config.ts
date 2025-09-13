import { ENVIRONMENT } from "./environment";

const base_url_api_debts = ENVIRONMENT.BASE_URL_API_DEBTS;

const ENVIRONMENTS = {

    //Login 
    POST_LOGIN: `${base_url_api_debts}/auth/login`,
    POST_LOGOUT: `${base_url_api_debts}/auth/logout`,
    POST_REFRESH_TOKEN: `${base_url_api_debts}/auth/refresh-token`,
    //Supabase auth
    BASE_URL_SUPABASE: ENVIRONMENT.BASE_URL_SUPABASE,
    PUBLIC_API_KEY_SUPABASE: ENVIRONMENT.PUBLIC_API_KEY_SUPABASE,

    //USER MANAGEMENT
    GET_USER_BY_EMAIL: `${base_url_api_debts}/users/get-user-by-email`,

    //DEBTS
    CREATE_DEBT: `${base_url_api_debts}/debts/create`,
    GET_ALL_DEBTS_BY_USER_ID: `${base_url_api_debts}/debts/get-all-debts-by-user`,
    GET_DEBT_BY_ID: `${base_url_api_debts}/debts/get-debt-by-id`,
}

export default ENVIRONMENTS;
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
    GET_USERS_PAGINATED: `${base_url_api_debts}/obtener-usuarios-paginados`,
    GET_USER_BY_UID: `${base_url_api_debts}/obtener-usuario-por-uid`,
    GET_USER_BY_ID: `${base_url_api_debts}/obtener-usuario-por-id`,

    //SYSTEM CONFIGURATION
    GET_ALL_FACULTIES: `${base_url_api_debts}/obtener-facultades`,
    CREATE_INITIAL_CONFIGURATION: `${base_url_api_debts}/crear-configuracion`,
    GET_CONFIGURATION_BY_ID: `${base_url_api_debts}/obtener-configuracion-por-id`,
    CREATE_CPD_MEMBER: `${base_url_api_debts}/crear-persona`,

    //APPLICATION MANAGEMENT
    CREATE_TEMPORARY_APPLICATION: `${base_url_api_debts}/crear-solicitud-temporal`,
    UPDATE_TEMPORARY_APPLICATION: `${base_url_api_debts}/actualizar-solicitud-temporal`,
    CREATE_RECOGNIZED_APPLICATION: `${base_url_api_debts}/crear-solicitud-reconocida`,
    UPDATE_RECOGNIZED_APPLICATION: `${base_url_api_debts}/actualizar-solicitud-reconocida`,
    GET_RECOGNIZED_APPLICATION_BY_APPLICATION_ID: `${base_url_api_debts}/obtener-solicitud-reconocida-por-solicitud-id`,
    CREATE_APPLICATION: `${base_url_api_debts}/crear-solicitud`,
    GET_PRODUCTION_TYPE_BY_ALIAS: `${base_url_api_debts}/obtener-tipo-produccion-por-alias`,
    GET_PRODUCTION_TYPE_BY_ID: `${base_url_api_debts}/obtener-tipo-produccion-por-id`,
    GET_TEACHER_BY_PERSON_ID: `${base_url_api_debts}/obtener-docente-por-id-persona`,
    GET_PERSON_BY_USER_ID: `${base_url_api_debts}/obtener-persona-por-usuario-id`,
    GET_TEMPORARY_APPLICATION_BY_TEACHER_ID: `${base_url_api_debts}/obtener-solicitud-temporal-por-docente-id`,
    GET_ALL_APPLICATIONS_BY_TEACHER_ID: `${base_url_api_debts}/obtener-listado-solicitudes-por-docente-id`,
    GET_ALL_APPLICATIONS_BY_FACULTY_ID: `${base_url_api_debts}/obtener-listado-solicitudes-por-facultad-id`,
    GET_APPLICATION_BY_ID: `${base_url_api_debts}/obtener-solicitud-por-id`,

    //REVIEW APPLICATIONS
    SAVE_VALIDATION_OF_APPLICATION: `${base_url_api_debts}/guardar-validacion`,
    UPDATE_APPLICATION_STATE: `${base_url_api_debts}/actualizar-estado-solicitud`,
    GET_ALL_VALIDATIONS_BY_APPLICATION_ID_AND_PERSON_ID: `${base_url_api_debts}/obtener-listado-validaciones-por-solicitud-id-y-persona-id`,
    GET_ALL_VALIDATIONS_BY_APPLICATION_ID: `${base_url_api_debts}/obtener-listado-validaciones-por-solicitud-id`,
    GET_ALL_APPLICATIONS_BY_FACULTY_ID_AND_SPECIFIC_STATUS: `${base_url_api_debts}/obtener-listado-solicitudes-por-facultad-id-y-estado-especifico`,
    SAVE_POINTS_APPLICATION_RECOGNITION: `${base_url_api_debts}/guardar-puntos-reconocimiento-solicitud`,
    UPDATE_POINTS_APPLICATION_RECOGNITION: `${base_url_api_debts}/actualizar-puntos-reconocimiento-solicitud`,
    GET_ALL_APPLICATIONS_BY_SPECIFIC_STATUS: `${base_url_api_debts}/obtener-listado-solicitudes-por-estado-especifico`,
    GET_POINTS_APPLICATION_RECOGNITION: `${base_url_api_debts}/obtener-puntos-reconocimiento-solicitud`,

    //FILE MANAGEMENT
    CREATE_FILE: `${base_url_api_debts}/subir-archivo`,
    GET_FILE_BY_ID: `${base_url_api_debts}/obtener-archivo-por-id`,
    BUCKED_NAME: 'gsrpi-storage',
}

export default ENVIRONMENTS;
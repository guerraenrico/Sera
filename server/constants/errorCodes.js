const UNKNOWN = "unknown";
const UNAUTHORIZED = "unauthorized";
const EXPIRED_SESSION = "expired_session";
const INVALID_SESSION_TOKEN = "invalid_session_token";

const AUTH_INVALID_PAYLOAD = "auth_invalid_payload";
const AUTH_INVALID_CODE = "auth_invalid_code";
const ERROR_CREATE_USER = "error_create_user";
const ERROR_CREATE_SESSION = "error_create_session";
const AUTH_ERROR_UNKNOWN = "auth_error_unknown";

const ERROR_READ_CATEGORY = "error_read_category";
const ERROR_SEARCH_CATEGORY = "error_search_category";
const ERROR_INSERT_CATEGORY = "error_insert_category";
const ERROR_DELETE_CATEGORY = "error_delete_category";
const ERROR_READ_TASK = "error_read_task";
const ERROR_INSERT_TASK = "error_insert_task";
const ERROR_DELETE_TASK = "error_delete_task";
const ERROR_UPDATE_TASK = "error_update_task";
const ERROR_UPDATE_SESSION = "error_update_session";

const ERROR_READ_TASK_RESULTS = "error_read_task_results";

const INVALID_AUTH_CODE = "invalid_auth_code";
const INVALID_CATEGORY_PARAMETERS = "invalid_category_parameters";
const INVALID_CATEGORY_ID = "invalid_category_id";
const INVALID_TASK_PARAMETERS = "invalid_task_parameters";
const INVALID_TASK_ID = "invalid_task_id";

const VALID_TOKEN_REQUIRED = "valid_token_required";
const USER_NOT_FOUND = "user_not_found";

module.exports = {
  UNKNOWN,
  UNAUTHORIZED,
  EXPIRED_SESSION,
  INVALID_SESSION_TOKEN,

  AUTH_INVALID_PAYLOAD,
  AUTH_INVALID_CODE,
  ERROR_CREATE_USER,
  ERROR_CREATE_SESSION,
  AUTH_ERROR_UNKNOWN,

  ERROR_READ_CATEGORY,
  ERROR_SEARCH_CATEGORY,
  ERROR_INSERT_CATEGORY,
  ERROR_DELETE_CATEGORY,

  ERROR_READ_TASK,
  ERROR_INSERT_TASK,
  ERROR_DELETE_TASK,
  ERROR_UPDATE_TASK,
  ERROR_UPDATE_SESSION,

  ERROR_READ_TASK_RESULTS,

  INVALID_AUTH_CODE,
  INVALID_CATEGORY_PARAMETERS,
  INVALID_CATEGORY_ID,
  INVALID_TASK_PARAMETERS,
  INVALID_TASK_ID,
  VALID_TOKEN_REQUIRED,
  USER_NOT_FOUND
};

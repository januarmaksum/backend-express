const MESSAGES = {
    ERROR_INTERNAL: "Internal server error",
    ERROR_UNAUTHORIZED: "Unauthorized access",
    ERROR_NOT_FOUND: "Resource not found",

    TOKEN_EXPIRED: "Token expired",
    TOKEN_INVALID: "Invalid token",

    PASSWORD_INCORRECT: "Password is incorrect",
    PASSWORD_ATTEMPT_LIMIT: "Password attempt limit",
    
    EMAIL_NOT_VERIFIED: "Email not verified",
    EMAIL_ALREADY_VERIFIED: "Email already verified",
    EMAIL_ALREADY_EXISTS: "Email already exists",

    USER_NOT_FOUND: "User not found",

    SUCCESS_LOGIN: "Login successful",
    SUCCESS_REGISTER: "User registered successfully",
    SUCCESS_LOGOUT: "Logout successful",
    SUCCESS_GET_USERS: "Get all users successfully",
    SUCCESS_CREATE_USERS: "User created successfully",
    SUCCESS_UPDATE_USER: "User updated successfully",
    SUCCESS_DELETE_USER: "User deleted successfully",

    VALIDATION_ERROR: "Validation error",
};

module.exports = { MESSAGES };

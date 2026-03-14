export const USER_TYPES = {
  UserController: Symbol.for("UserController"),
  UserService: Symbol.for("UserService"),
  UserRepository: Symbol.for("UserRepository"),
};

export const AUTH_TYPES = {
  SignupController: Symbol.for("SignupController"),
  SignupService: Symbol.for("SignupService"),

  AuthController: Symbol.for("AuthController"),
  AuthService: Symbol.for("AuthService"),
};

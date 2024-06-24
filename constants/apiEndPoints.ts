

type UserService = {
   login:string,
   register:string,
   logout:string
}
  
const userService : UserService = {
    login:"/api/users/login",
    register: "/api/users/register",
    logout:"/api/users/logout"
}

type AccountService = {
    accountValidation:string,
    accountTermination:string
}
const accountService :AccountService = {
    accountValidation:"/api/accounts/validation",
    accountTermination:"/api/accounts/termination"
}

export default{
   userService,
   accountService
}
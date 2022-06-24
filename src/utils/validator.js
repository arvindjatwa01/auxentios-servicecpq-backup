export default class Validator {
    emailValidation (email) {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!email || regex.test(email) === false){
            return false;
        }
        return true;
    }
    firstNameValidation (name) {
        if(name.length < 2){
            return false;
        }
        return true;
    }
    lastNameValidation (name) {
        if(name.length < 2){
            return false;
        }
        return true;
    }
    passwordValidation (name) {
        if(name.length < 2){
            return false;
        }
        return true;
    }
}
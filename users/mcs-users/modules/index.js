"use strict";
(()=>{
    module.exports={

        createUsers:require('./user-modules/create-users'),
        readUsersById:require('./user-modules/read-users-by-id'),
        updateUsersById:require('./user-modules/update-users-by-id'),
        readAllUsers:require('./user-modules/read-all-users'),
        deleteUsersById:require('./user-modules/delete-users-by-id')
    }
})()
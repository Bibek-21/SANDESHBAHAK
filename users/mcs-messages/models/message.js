const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken');


module.exports = mongoose => {
    let schema = 
        mongoose.Schema(
            {
                message:{
                    type:String,
                    required: [true, 'Please add message.'],

                },
                senderId:{
                    type:String,
                    required: true,

                },
                receiverId:{
                    type:String,
                    required: true,
                },
                isDeleted:{
                    type:Boolean,
                    default:0
                },
            
                
              

            
            
            },
            { timestamps: true }
        )
    ;
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    

//    // Encrypt message using bcryptjs
//    schema.pre('save', async function(next) {
//     // This  run when password is not changed or modified.
//     if(!this.isModified('message')){
//         next();                                  // incase of encryption of message 
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.message = await bcrypt.hash(this.message, salt);
// })



      const messages = mongoose.model("Message", schema);
      return messages;
    
};
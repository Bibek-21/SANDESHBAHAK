const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken');


module.exports = mongoose => {
    let schema = 
        mongoose.Schema(
            {
                fullName:{
                    type:String,
            
                },
            
                email:{
                    type:String,
            
                    required: [true, 'Please add email.'],
                    unique:true,
                    match: [
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        'Please add a valid email.'
                    ],
                },
                    
                
            
                gender:{
                    type:String,
                    enum:['Male','Female','Rather not say']
                },
            
                dob:{
                    type:Date
                },
            
                password:{
                    type:String,
            
                },
                isDeleted:{
                    type:Boolean,
                    default:0
                },
                resetPasswordToken: String,
            
                resetPasswordExpire: Date,
            
            
            
            },
            { timestamps: true }
        )
    ;
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    

   // Encrypt password using bcryptjs
   schema.pre('save', async function(next) {
    // This  run when password is not changed or modified.
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


schema.methods.getSignedJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

schema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

      const users = mongoose.model("Users", schema);
      return users;
    
};
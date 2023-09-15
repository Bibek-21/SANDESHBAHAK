module.exports=(mongoose)=>{
 let userSchema = mongoose.schema({

    fullName:{
        type:String,

    },

    email:{
        type:String,
        
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

    resetPasswordToken: String,

    resetPasswordExpire: Date,



 },    { timestamps: true }
 );
 userSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });


// Encrypt password using bcryptjs
userSchema.pre('save', async function(next) {
    // This  run when password is not changed or modified.
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

}
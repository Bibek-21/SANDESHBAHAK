module.exports=(mongoose)=>{
 let schema = mongoose.schema({

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

    }



 },    { timestamps: true }
 );
 schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
}
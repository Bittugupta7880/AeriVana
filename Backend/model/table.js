import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  contact: { type: String },
  address: { type: String },
  profile: { type: String },
  userType: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


export const usermodModel = mongoose.model('user', userSchema);

const propertySchema=new mongoose.Schema({
   title: { type: String },
  price: { type: String },
  area: { type: String },
  des: { type: String },
  location: { type: String },
  pic: { type: String },

})

export const propertyModel=mongoose.model("property",propertySchema)


const BuyerSchema = new mongoose.Schema({
  userId: { type: String },
  propertyId: { type: String },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
})
export const buyerModel = mongoose.model('buyers', BuyerSchema)

const ContactSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
})

export const ContactModel = mongoose.model('contacts', ContactSchema)
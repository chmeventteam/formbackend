import { Schema, model } from 'mongoose';

const formSchema = new Schema({
  name: String,
  email: String,
  receiptNo : String,
  classN : String , 
  educationLevel:String,
  rollNo : {type:String,unique:true},
  receiptImageUrl: String,
  accepted: Boolean,
  rejected:Boolean,
  Entered:Boolean,
  // other form fields
});

export default model('Form', formSchema);

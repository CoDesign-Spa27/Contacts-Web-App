import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMessage extends Document {
  contactId: Types.ObjectId;
  otp: string;
  message: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  contactId: {
    type: Schema.Types.ObjectId,
    ref: "Contact",
    required: true,
  },
  otp: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>("Message", MessageSchema);

import { Schema, model, models, Document } from "mongoose";

interface ICommunityMsg extends Document {
  communityId: string;
  text: string;
  sender: string;
  senderName: string;
  createdAt: Date;
}

const communityMsgSchema = new Schema<ICommunityMsg>({
  communityId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const communityMsgModel = models.CommunityMsg || model("CommunityMsg", communityMsgSchema);

export default communityMsgModel;
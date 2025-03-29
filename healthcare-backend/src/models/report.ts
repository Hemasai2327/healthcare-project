import mongoose, { Document, Schema } from 'mongoose';

export interface IReport extends Document {
  name: string;
  description: string;
  filePath: string;
  fileName: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const reportSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Report = mongoose.model<IReport>('Report', reportSchema);

export default Report;
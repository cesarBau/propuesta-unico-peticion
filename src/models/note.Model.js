import mongoose from 'mongoose'
import Moment from 'moment'

export const noteSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: false
    }
  },
  {
    strict: false,
    versionKey: false,
    timestamps: {
      currentTime: () => Moment(Moment.now(), 'x').toISOString(),
    },
  }
)

export default null
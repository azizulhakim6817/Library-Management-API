import mongoose, { Schema, Document } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  updateAvailability: () => Promise<IBook>;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: {
      type: Boolean,
      default: function () {
        return this.copies > 0;
      },
    },
  },
  { timestamps: true }
);

bookSchema.methods.updateAvailability = function (this: IBook) {
  this.available = this.copies > 0;
  return this.save();
};

export const Book = mongoose.model<IBook>("Book", bookSchema);

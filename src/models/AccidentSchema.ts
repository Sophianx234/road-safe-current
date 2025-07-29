// models/Accident.ts

import { Document, Schema, model, models } from "mongoose";

export interface IAccident extends Document {
  date: string;
  year: number;
  region: string;
  location: {
    lat: number;
    lng: number;
  };
  vehicleType: string;
  accidentType: string;
  severity: "Fatal" | "Serious" | "Minor";
  fatalities: number;
  injuries: number;
  description?: string;
}

const AccidentSchema = new Schema<IAccident>(
  {
    date: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["Private Car", "Motorcycle", "Truck", "Bus", "Taxi"],
    },
    accidentType: {
      type: String,
      required: true,
      enum: ["Collision", "Pedestrian Knockdown", "Overturn", "Run-off-road", "Fire"],
    },
    severity: {
      type: String,
      required: true,
      enum: ["Fatal", "Serious", "Minor"],
    },
    fatalities: {
      type: Number,
      required: true,
    },
    injuries: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Accident = models.Accident || model<IAccident>("Accident", AccidentSchema);

export default Accident;

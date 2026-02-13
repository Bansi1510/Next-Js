import { connect } from "mongoose";


const DB_URL = process.env.MONGO;

if (!DB_URL) {
  throw new Error("Database Url not Found")
}

let catched = global.mongoose;

if (!catched) {
  catched = global.mongoose = { con: null, promise: null }
}

const connectDB = async () => {
  if (catched.con) {
    return catched.con;
  }
  if (!catched.promise) {
    catched.promise = connect(DB_URL).then((c) => c.connection)
  }
  try {
    catched.con = await catched.promise;
  } catch (error) {
    throw error;
  }
  return catched.con;
}

export default connectDB;
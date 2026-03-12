import mongose from 'mongoose';

const connectDB = async () => {
  try {
    await mongose.connect('mongodb://localhost:27017/todo-tdd', {
   
    
    });
   // console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  } 
};

export default connectDB;
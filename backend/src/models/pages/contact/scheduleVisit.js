import mongoose from "mongoose";

const scheduleVisitSchena = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    visitTo: {
        type: String,
        enum: ['Calgary', 'Chestermere'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

const ScheduleVisit = mongoose.model("ScheduleVisit", scheduleVisitSchena);
export default ScheduleVisit;
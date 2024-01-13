const {Booking}=require('../models/index')
const {StatusCodes}=require('http-status-codes')
const {AppError,ValidationError}=require('../utils/errors/index')
class BookingRepository {
  async create(data) {
    try {
      const booking=await Booking.create(data);
      return booking;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        console.log("Creating new Validation Error");
        throw new ValidationError(error);
      }
      console.log("Something went wrong on repository layer");
      throw new AppError('RepositoryError',
      'Cannot create Booking',
      'There was some issue creating the booking,please try again later',
      StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
  async update(bookingId,data) {
    try {
     const booking=await Booking.findByPk(bookingId)
     if(data.status){
      booking.status=data.status;
     }
     await booking.save();
     return booking;
    } catch (error) {
     
      throw new AppError('RepositoryError',
      'Cannot update Booking',
      'There was some issue updating the booking,please try again later',
      StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
module.exports=BookingRepository
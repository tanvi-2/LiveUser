const mongoose = require("mongoose");

const isAlphaWithSpaces = (value) => /^[a-zA-Z\s]+$/.test(value);
const isValidStreet = (value) =>
     /^[a-zA-Z0-9\s.,-]+$/.test(value) && /[a-zA-Z]/.test(value);
const isValidMobileNo = (value) => {
     return /^[1-9][0-9]{9}$/.test(value);
};

const userSchema = new mongoose.Schema({
     firstName: {
          type: String,
          required: [true, "First name is required"],
          validate: {
               validator: isAlphaWithSpaces,
               message: "First name can only contain alphabetic characters",
          },
     },
     lastName: {
          type: String,
          required: [true, "Last name is required"],
          validate: {
               validator: isAlphaWithSpaces,
               message: "Last name can only contain alphabetic characters",
          },
     },
     mobileNo: {
          type: String,
          required: [true, "Mobile number is required"],
          validate: {
               validator: isValidMobileNo,
               message: "Mobile number must be 10 digits.",
          },
     },
     emailId: {
          type: String,
          required: [true,"Email is required"],
          
     },
     address: {
          street: {
               type: String,
               required: [true, "Street is required"],
               validate: {
                    validator: isValidStreet,
                    message: "Street must contain at least one alphabetic character",
               },
          },
          city: {
               type: String,
               required: [true, "City is required"],
               validate: {
                    validator: isAlphaWithSpaces,
                    message: "City can only contain alphabetic characters and spaces",
               },
          },
          state: {
               type: String,
               required: [true, "State is required"],
               validate: {
                    validator: isAlphaWithSpaces,
                    message: "State can only contain alphabetic characters and spaces",
               },
          },
          country: {
               type: String,
               required: [true, "Country is required"],
               validate: {
                    validator: isAlphaWithSpaces,
                    message: "Country can only contain alphabetic characters and spaces",
               },
          },
     },
     loginId: {
          type: String,
          required: [true, "Login ID is required"],
          validate: {
               validator: function (v) {
                    return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{8,}$/.test(v);
               },
               message: props => `Use 8 alphanumeric characters, including at least one letter and one number.`,
          },
     },
     password: {
          type: String,
          required: [true, "Password is required"],
          match: [
               /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
               "Password must be at least 6 characters, include one uppercase letter, one lowercase letter, one number, and one special character",
          ],
     },
});

userSchema.pre('save', function (next) {
    this.emailId = this.emailId.toLowerCase();
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

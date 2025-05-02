const express = require("express");
const mongoose= require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description: String,
    image:{
        
        url:{
            type:String,
            default:
                "https://img.freepik.com/free-photo/brown-wooden-dock_198523-110.jpg?t=st=1740241116~exp=1740244716~hmac=b3946e276d7a22587dbf4d8c3b986ba83aac0ad3d5a35a9909b810ff91c74f47&w=2000",
            set: (v)=>
                v === ""
                    ? "https://img.freepik.com/free-photo/brown-wooden-dock_198523-110.jpg?t=st=1740241116~exp=1740244716~hmac=b3946e276d7a22587dbf4d8c3b986ba83aac0ad3d5a35a9909b810ff91c74f47&w=2000"
                    : v,
            },
        },
    price: Number,
    location : String,
    country: String,
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review"
        },
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing  = mongoose.model("Listing", listingSchema);
module.exports  = Listing;
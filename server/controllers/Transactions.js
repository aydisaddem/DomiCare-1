const Transactions = require("../models/Transactions");
const Notifications = require ("../models/Notifications");
const e = require("express");
module.exports = {
  CreateServiceSeekerRequest: async (req, res) => {
    const {
      seekerId,
      providerId,
      adress,
      details,
      selectedStartDate,
      selectedEndDate,
      file,
      type,
    } = req.body;
    try {
      const RequestService = await Transactions.create({
        seekerId,
        providerId,
        adress,
        details,
        selectedStartDate,
        selectedEndDate,
        file,
        type,
      });
      res.send(RequestService);
    } catch (err) {
      res.send(err);
    }
  },
  GetReceivedOffers: async (req, res) => {
    try {
      const offers = await Transactions.find(
        {
          type: "offer",
        },
        {
          seekerId: req.params._id,
        }
      );
      res.send(offers);
    } catch (err) {
      res.send(err);
    }
  },
  SendServiceOffer: async (req, res) => {
    const { type, postid, providerId, seekerId } = req.body;
    try {
      const offer = await Transactions.create({
        type,
        postid,
        providerId,
        seekerId,
      });
      res.send(offer);
    } catch (err) {
      res.send(err);
    }
  },
  GetReceivedRequests: async (req, res) => {
    console.log("aaaaaa");
    try {
      const offers = await Transactions.find({
        type: "request",
        providerId: req.params._id,
      }).populate('seekerId')
      res.send(offers);
      console.log("offers", offers);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  GetSendedOffers: async (req, res) => {
      console.log("hello offers", req.params._id);
      
    try {
      const offers = await Transactions.find({
        providerId: req.params._id,
      });
      res.send(offers);
    } catch (err) {
      res.send(err);
    }
  },
  GetSendedRequests: async (req, res) => {
    console.log("first", req.params._id);

    try {
      const offers = await Transactions.find({
        type: "request",
        seekerId: req.params._id,
      }).populate("providerId")
      res.send(offers);
    } catch (err) {
      res.send(err);
    }
  },
  DeleteRequest: async (req, res) => {
    console.log("cancel");

    try {
      const notification=await Notifications.create({
        providerId:req.body.provider_id,
        seekerId:req.body.seekerId,
        createdAt:req.body.createdAt,
        content:req.body.content,
        type:req.body.type
      });
      
      const transaction=await Transactions.findByIdAndUpdate({ _id: req.params._id },{status:"Cancelled"});
      res.send();
    } catch (error) {
      console.log(error);
    }
  },
  CancelOffer :async(req,res)=>{
    try{
      const notification=await Notifications.create({
        providerId:req.body.provider_id,
        seekerId:req.body.seekerId,
        createdAt:req.body.createdAt,
        content:req.body.content,
        type:req.body.type
      });
      const cancelledOffer=await Transactions.findByIdAndUpdate({_id:req.params._id},{status:"Cancelled"})
      res.send(cancelledOffer)
    }
    catch(err){
      console.log(err);
    }
  },
acceptrequest: async (req, res) => {
    console.log("cancel");

    try {
      const notification=await Notifications.create({
        providerId:req.body.provider_id,
        seekerId:req.body.seekerId,
        createdAt:req.body.createdAt,
        content:req.body.content,
        type:req.body.type
      });
      
      const transaction=await Transactions.findByIdAndUpdate({ _id: req.params._id },{status:"Confirmed"});
      res.send();
    } catch (error) {
      console.log(error);
    }
  },
  
 
};

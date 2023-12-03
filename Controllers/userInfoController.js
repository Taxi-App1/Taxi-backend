import Order from "../Models/orderModel.js";

class controller{

    async getTripHistory(req,res){
        const {id} = req.params
        try{
            const findTrip = await Order.find({user_id : id})
            return res.status(200).json(findTrip)
        }catch(err){
            return res.send("No Trip Yet")
        }
    }

}


const Controller = new controller()

export default Controller
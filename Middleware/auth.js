import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.body.token || req.headers["token"].split(" ")[1];
  if (!token) {
    return res.status(403).send("Please sign in  ");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    console.log(req.user);
  } catch (err) {
    return res.status(401).send(err);
  }
  return next();
}

export function isSuperAdmin(req, res, next) {
  try {
    if (req.user.role === "user" |"driver" || req.user.role === "isAdmin") {
      return res.send({ message: "you are not a super admin" });
    }
    next();
   
  } catch (err) {
    next(err);
    res.send({ message:err.message });
  }
}

export function isGeneralAdmin(req, res, next) {
  console.log(req.user)
    try{
        if(req.user.role ==="isSuperAdmin"){
            return res.send({ message: "you are not a  admin" }); 
        }
        else if(req.user.role ==="user"||req.user.role ==="driver"){
        next()}
        else{
            return res.send({ message: "you are not a  admin" }); 
        }
    }catch(err){
        next(err)
    res.send({ message:err.message });

    }
}
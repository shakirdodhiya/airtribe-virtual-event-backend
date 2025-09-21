exports.verifyOrganizer = async (req, res, next) => {
  if(req.user.role === "Organizer"){
    next();
  }else{
    res.status(401).send({
      status : false,
      error : "Access denied: 'Organizer' privileges required."
    })
  }
}

exports.verifyAttendee = async (req, res, next) => {
  if(req.user.role === "Attendee"){
    next();
  }else{
    res.status(401).send({
      status : false,
      error : "Access denied: 'Attendee' privileges required."
    })
  }
}
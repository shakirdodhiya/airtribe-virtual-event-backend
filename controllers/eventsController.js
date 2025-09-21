const eventsModel = require('../models/eventsModel');
const { sendMail } = require('../utils/sendMail');

exports.createEvent = async (event) => {

  return await eventsModel.create(event);
}

exports.getEvents = async () => {
  return await eventsModel.find({}).sort({ createdAt: -1 }).populate('participants', "-password");
}

exports.getEvent = async (event_id) => {
  return await eventsModel.findOne({ _id: event_id });
}

exports.updateEvent = async (event_id, update_obj) => {
  return await eventsModel.updateOne(
    { _id: event_id },
    {
      $set: update_obj
    }
  )
}

exports.deleteEvent = async (event_id) => {
  return await eventsModel.deleteOne({ _id: event_id });
}

exports.registerToEvent = async (event_id, user) => {

  const participated_in_event = await eventsModel.findOne({ _id: event_id, participants: user._id });

  if (participated_in_event) {
    throw new Error('Already registered to this event !');
  } else {

    const event = await this.getEvent(event_id);

    const mail_html = `
      <div
        style = "font-size:18px; font-family:verdana; max-width: 500px; margin-left:auto; margin-right: auto; padding : 24px; background: #e6e6ff"
      >
        <p>
          Dear ${user.name},
        </p>
        <p>
          You have successfully registered for event "${event.title}"
        </p>
        <p>
          <b> Event Name </b> <br />
          ${event.title}
        </p>
        <p>
          <b> Date </b> <br />
          ${event.date}
        </p>
        <p>
          <b> Time </b> <br />
          ${event.time}
        </p>
        <p>
          <b> Description </b> <br />
          ${event.description}
        </p>
      </div>
    `
    await sendMail({
      to: user.email,
      subject: 'Event registration successfull !',
      html: mail_html
    })

    return await eventsModel.updateOne(
      { _id : event_id },
      {
        $push : {
          participants : user._id
        }
      }
    )
  }
}

exports.cancleEventRegistration = async (event_id, user_id) => {
  return await eventsModel.updateOne(
    { _id: event_id },
    {
      $pull: {
        participants: user_id
      }
    }
  )
}

exports.getParticipatedEvents = async (user_id) => {
  return await eventsModel.find({ participants: user_id }, '-participants').sort({ createdAt: -1 });
}

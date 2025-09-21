const express = require('express');
const { createEvent, getEvents, getEvent, deleteEvent, updateEvent, registerToEvent, cancleEventRegistration, getParticipatedEvents } = require('../controllers/eventsController');
const { verifyOrganizer, verifyAttendee } = require('../middlewares/verifyUserRoles');

const router = express.Router();

router.get('/participated', verifyAttendee, async (req, res) => {
  try{

    const participated_events = await getParticipatedEvents(req.user_id);
    res.send({
      success : true,
      events : participated_events
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error
    })
  }
})

router.post('/', verifyOrganizer, async (req, res) => {
  const event = req.body;

  try {
    const created_event = await createEvent(event);
    res.send({
      success: true,
      event : created_event
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message
    })
  }
})

router.get('/', verifyOrganizer, async (req, res) => {
  try{
    const events = await getEvents()
    res.send({
      success : true,
      events : events
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error
    })
  }
})

router.get('/:id', verifyOrganizer, async (req, res) => {
  try{
    const event_id = req.params.id;
    const event = await getEvent(event_id);
    res.send({
      success : true,
      event : event
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error
    })
  }
})

router.put('/:id', verifyOrganizer, async (req, res) => {
  try{
    const event_id = req.params.id;
    const {
      _id,
      participants,
      ...update_obj
    } = req.body;

    await updateEvent(event_id, update_obj)

    res.send({
      success : true
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error
    })
  }
})

router.delete('/:id', verifyOrganizer, async (req, res) => {
  try{
    const event_id = req.params.id;
    await deleteEvent(event_id);
    res.send({
      success : true
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error
    })
  }
})

router.post('/:id/register', verifyAttendee, async (req, res) => {
  try{
    const event_id = req.params.id;
    await registerToEvent(event_id, req.user);
    res.send({
      success : true
    })
  } catch (error) {

    res.status(400).send({
      success: false,
      error: error.message
    })
  }
})

router.post('/:id/cancel-registration', verifyAttendee, async (req, res) => {
  try{
    const event_id = req.params.id;
    await cancleEventRegistration(event_id, req.user_id);
    res.send({
      success : true
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error
    })
  }
})

module.exports = router;

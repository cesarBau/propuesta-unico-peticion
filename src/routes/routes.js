import express from 'express'
import { healthController } from '../controller/health.Controller'
import { notesController } from '../controller/notes.Controller'
import { tryCatch } from '../middleware/tryCatch'

const router = express.Router()

router.get('/', healthController.healthCheck)
router.route('/notes').get(notesController.getNotes).post(tryCatch(notesController.saveNotes))

module.exports = router
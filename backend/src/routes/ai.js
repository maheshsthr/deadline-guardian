import { Router } from 'express'
import auth from '../middleware/auth.js'
import { analyze, chat } from '../controllers/aiController.js'

const router = Router()

router.use(auth)
router.post('/analyze', analyze)
router.post('/chat', chat)

export default router

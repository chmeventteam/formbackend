import { Router } from 'express';
const router = Router();
import Form from '../models/Form.js';

// Create a new form entry
router.post('/', async (req, res) => {
  const { name, email, receiptNo, classN,educationLevel, rollNo,receiptImageUrl } = req.body;

  const accepted = false;
  const rejected = false;
  const Entered = false;
  // Check if the transactionId already exists
  const existingForm = await Form.findOne({ receiptNo });
  if (existingForm) {
    return res.status(400).json({ message: 'Transaction ID already exists' });
  }

  const newForm = new Form({ name,email, receiptNo, classN,educationLevel, rollNo,receiptImageUrl,accepted,rejected,Entered });
  // Save the form to the database
  await newForm.save();

  res.status(200).json({ message: 'Thank you for Registering for RANG TAARI - AN FOLK FIESTA. You will soon receive the E-Pass and QRCode on your email. Entry will be permitted only after screening of QR Code.' });
});

export default router;

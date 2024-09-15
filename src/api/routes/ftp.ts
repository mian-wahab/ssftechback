import { Router } from 'express';
import { celebrate } from 'celebrate';
import { AsyncWrapper } from '@/utils';
import { verifyMongooseId } from '@/validators/common';
import { AddFtp } from '../controllers/ftp/addFtp';
import { getAllFtp } from '../controllers/ftp/getAllFtp';
import { UpdateFtp } from '../controllers/ftp/updateFtp';
import { DeleteFtp } from '../controllers/ftp/deleteFtp';

const router = Router();

router.post('/create', AsyncWrapper(AddFtp));
router.get('/getAll', AsyncWrapper(getAllFtp));
router.put('/update/:id', celebrate(verifyMongooseId), AsyncWrapper(UpdateFtp));
router.delete('/delete/:id', celebrate(verifyMongooseId), AsyncWrapper(DeleteFtp));

export default router
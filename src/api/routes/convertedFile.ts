import { Router } from 'express';
import { celebrate } from 'celebrate';
import { AsyncWrapper } from '@/utils';
import {transferExcelData} from '../controllers/convertedfile/convertFile';
const router = Router();

router.post('/add', AsyncWrapper(transferExcelData))

export default router
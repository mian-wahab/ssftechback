import { Request, Response } from 'express';
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { InputData } from './types';
import { ApiResponse } from '@/shared';
const sourceFilePath = path.join(__dirname, '../../../uploads/products_export_1.csv');
const outputXlsxPath = path.join(__dirname, '../../../uploads/output.csv');

const headers: (keyof InputData)[] = [
  "Handle", "Command", "Title", "Supplier Name", "Supplier Code", "Topline Code", "Barcode",
  "Safery Sheet Src", "Body (HTML)", "Selling Point 1", "Selling Point 2", "Selling Point 3",
  "topline-itembrand", "Metafield (Nested) Attributes", "topline-itemdesc", "Vendor",
  "Standardized Product Type", "Custom Product Type", "Tags", "Published", "Product Category",
  "Option1 Name", "Option2 Name", "Option3 Name", "Category ID", "Variant SKU", "Variant Price",
  "Variant Barcode", "Image Alt Text", "SEO Title", "SEO Description", "Cost per item", "Status",
  "Image Src"
];

export const transferExcelData = (req: Request, res: Response) => {
    const sourceWorkbook = XLSX.readFile(sourceFilePath, { type: 'file', raw: true });
    const sourceWorksheet = sourceWorkbook.Sheets[sourceWorkbook.SheetNames[0]];
    const sourceData: any[] = XLSX.utils.sheet_to_json(sourceWorksheet);

    const formattedData = sourceData.map(row => {
      const formattedRow: Partial<InputData> = {};

      headers.forEach(header => {
        formattedRow[header] = row[header] || '';
      });

      return formattedRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers as string[] });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the workbook to a file
    XLSX.writeFile(workbook, outputXlsxPath);

    return ApiResponse(true, "File created successfully", outputXlsxPath , 201, res);

};

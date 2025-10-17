import { NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { userName, courseName, completionDate } = await req.json();

    if (!userName || !courseName || !completionDate) {
      return NextResponse.json(
        { error: 'User name, course name, and completion date are required' },
        { status: 400 }
      );
    }

    // Read your PDF template
    const templatePath = path.join(process.cwd(), 'Certification Template.pdf');
    const templateBytes = fs.readFileSync(templatePath);
    
    // Load the PDF
    const pdfDoc = await PDFDocument.load(templateBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    
    // Get page dimensions
    const { width, height } = firstPage.getSize();
    
    // Add text to your template
    // You'll need to adjust these coordinates to match your template
    firstPage.drawText(userName, {
      x: width / 2 - 100, // Adjust these coordinates
      y: height / 2 + 50, // Adjust these coordinates
      size: 24,
      color: rgb(0, 0, 0),
    });
    
    firstPage.drawText(courseName, {
      x: width / 2 - 100, // Adjust these coordinates
      y: height / 2, // Adjust these coordinates
      size: 18,
      color: rgb(0, 0, 0),
    });
    
    firstPage.drawText(completionDate, {
      x: width / 2 - 100, // Adjust these coordinates
      y: height / 2 - 50, // Adjust these coordinates
      size: 14,
      color: rgb(0, 0, 0),
    });
    
    // Generate the PDF
    const pdfBytes = await pdfDoc.save();
    
    // Return the PDF as a response
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${userName}-${courseName}-certificate.pdf"`,
      },
    });

  } catch (error) {
    console.error('Error generating certificate:', error);
    return NextResponse.json(
      { error: 'Failed to generate certificate' },
      { status: 500 }
    );
  }
}







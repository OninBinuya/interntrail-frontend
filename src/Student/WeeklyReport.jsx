"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Printer } from "lucide-react"
import React, { useState, useEffect } from 'react';
import { format, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, getWeek, differenceInCalendarWeeks } from 'date-fns';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import { CheckCircle, Save, MessageCircle, FileText } from 'lucide-react';
import FeedbackThread from './FeedbackThread';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PDFDownloadLink } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


export default function WeeklyReport({ weeklyReport, supervisorName }) {
  const handlePrint = () => {
    window.print()
  }

  const calculateWorkingHours = (timeIn, timeOut) => {
    if (timeIn === "N/A" || timeOut === "N/A") return "N/A";

    const [inHours, inMinutes] = timeIn.split(':').map(Number);
    const [outHours, outMinutes] = timeOut.split(':').map(Number);

    let totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);

    // Subtract 1 hour for lunch break
    totalMinutes -= 60;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours} hours\nand ${minutes} minutes`;
  };

  // Format hours for display in the table (without line break)
  const formatHoursForTable = (timeIn, timeOut) => {
    if (timeIn === "N/A" || timeOut === "N/A") return "N/A";

    const [inHours, inMinutes] = timeIn.split(':').map(Number);
    const [outHours, outMinutes] = timeOut.split(':').map(Number);

    let totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);

    // Subtract 1 hour for lunch break
    totalMinutes -= 60;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours} hours and ${minutes} minutes`;
  };

  // Calculate total working hours for the week
  const calculateTotalHours = () => {
    return weeklyReport.reduce((total, entry) => {
      if (entry.timeIn === "N/A" || entry.timeOut === "N/A") return total;

      const [inHours, inMinutes] = entry.timeIn.split(':').map(Number);
      const [outHours, outMinutes] = entry.timeOut.split(':').map(Number);

      let totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
      // Subtract lunch break
      totalMinutes -= 60;

      return total + totalMinutes;
    }, 0);
  };

  const formatTotalHours = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hours and ${minutes} minutes`;
  };

  const generatePDF = async () => {
    try {
      // Create PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const margin = 20; // Margin in mm
      
      // Function to add header to each page
      const addHeader = async () => {
        // Get the logos from the DOM
        const leftLogoElement = document.querySelector('img[alt="Left University Logo"]');
        const rightLogoElement = document.querySelector('img[alt="Right University Logo"]');
        
        // Left logo
        if (leftLogoElement) {
          const leftLogoCanvas = await html2canvas(leftLogoElement, { 
            scale: 2, 
            useCORS: true,
            logging: false
          });
          const leftLogoData = leftLogoCanvas.toDataURL('image/png');
          pdf.addImage(leftLogoData, 'PNG', margin, margin, 15, 15);
        }
        
        // Right logo
        if (rightLogoElement) {
          const rightLogoCanvas = await html2canvas(rightLogoElement, { 
            scale: 2, 
            useCORS: true,
            logging: false
          });
          const rightLogoData = rightLogoCanvas.toDataURL('image/png');
          pdf.addImage(rightLogoData, 'PNG', pageWidth - margin - 15, margin, 15, 15);
        }
        
        // Add university name and address
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text("WESLEYAN UNIVERSITY - PHILIPPINES", pageWidth / 2, margin + 8, { align: 'center' });
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Mabini Extension, Cabanatuan City, Nueva Ecija", pageWidth / 2, margin + 15, { align: 'center' });
        
        // Add report title
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text("Weekly Accomplishment Report", pageWidth / 2, margin + 25, { align: 'center' });
        
        // Add a line under the header
        pdf.line(margin, margin + 30, pageWidth - margin, margin + 30);
        
        return margin + 35; // Return the Y position after the header
      };
      
      // Add first page with header
      let yPosition = await addHeader();
      
      // Prepare table headers
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      const cellPadding = 3;
      const dateWidth = 25;
      const dayWidth = 20;
      const hoursWidth = 30; // Standard size
      const remarksWidth = 25;
      const accomplishmentWidth = pageWidth - margin*2 - dateWidth - dayWidth - hoursWidth - remarksWidth;
      
      // Draw table headers
      const drawTableHeaders = () => {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        
        pdf.rect(margin, yPosition, dateWidth, 10);
        pdf.text("Date", margin + cellPadding, yPosition + 7);
        
        pdf.rect(margin + dateWidth, yPosition, dayWidth, 10);
        pdf.text("Day", margin + dateWidth + cellPadding, yPosition + 7);
        
        pdf.rect(margin + dateWidth + dayWidth, yPosition, hoursWidth, 10);
        pdf.text("Working Hours", margin + dateWidth + dayWidth + cellPadding, yPosition + 7);
        
        pdf.rect(margin + dateWidth + dayWidth + hoursWidth, yPosition, accomplishmentWidth, 10);
        pdf.text("Accomplishment", margin + dateWidth + dayWidth + hoursWidth + cellPadding, yPosition + 7);
        
        pdf.rect(margin + dateWidth + dayWidth + hoursWidth + accomplishmentWidth, yPosition, remarksWidth, 10);
        pdf.text("Remarks", margin + dateWidth + dayWidth + hoursWidth + accomplishmentWidth + cellPadding, yPosition + 7);
        
        yPosition += 10;
        pdf.setFont('helvetica', 'normal');
      };
      
      drawTableHeaders();
      
      // Draw table rows
      for (const entry of weeklyReport) {
        // Calculate the height needed for the accomplishment text
        const textLines = pdf.splitTextToSize(entry.report || "No report", accomplishmentWidth - cellPadding*2);
        
        // Minimum row height is 15mm to accommodate the two-line working hours
        const textHeight = Math.max(textLines.length * 7, 15);
        
        // Check if we need a new page
        if (yPosition + textHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = await addHeader();
          drawTableHeaders();
        }
        
        // Draw cell borders
        pdf.rect(margin, yPosition, dateWidth, textHeight);
        pdf.rect(margin + dateWidth, yPosition, dayWidth, textHeight);
        pdf.rect(margin + dateWidth + dayWidth, yPosition, hoursWidth, textHeight);
        pdf.rect(margin + dateWidth + dayWidth + hoursWidth, yPosition, accomplishmentWidth, textHeight);
        pdf.rect(margin + dateWidth + dayWidth + hoursWidth + accomplishmentWidth, yPosition, remarksWidth, textHeight);
        
        // Fill cell content
        pdf.text(entry.date, margin + cellPadding, yPosition + 7);
        pdf.text(entry.day, margin + dateWidth + cellPadding, yPosition + 7);
        
        // Split working hours into two lines
        const workingHours = calculateWorkingHours(entry.timeIn, entry.timeOut);
        pdf.text(workingHours.split('\n'), margin + dateWidth + dayWidth + cellPadding, yPosition + 7);
        
        // Add multiline text for accomplishment
        pdf.text(textLines, margin + dateWidth + dayWidth + hoursWidth + cellPadding, yPosition + 7);
        
        // Remarks (empty in your example)
        pdf.text("", margin + dateWidth + dayWidth + hoursWidth + accomplishmentWidth + cellPadding, yPosition + 7);
        
        yPosition += textHeight;
      }
      
      // Check if we need a new page for summary
      if (yPosition + 60 > pageHeight - margin) {
        pdf.addPage();
        yPosition = await addHeader();
      }
      
      // Add total hours
      yPosition += 10;
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Total Number of Hours: ${formatTotalHours(calculateTotalHours())}`, margin, yPosition);
      
      // Add certification
      yPosition += 20;
      pdf.setFont('helvetica', 'normal');
      pdf.text("Certified by:", pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 20;
      pdf.setFont('helvetica', 'bold');
      pdf.text(supervisorName || 'Not Assigned', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 7;
      pdf.setFont('helvetica', 'normal');
      pdf.text("Name of Trainor", pageWidth / 2, yPosition, { align: 'center' });
      
      // Add a new page for the narrative
      pdf.addPage();
      yPosition = await addHeader();
      
      // Add narrative heading
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Weekly Narrative", pageWidth / 2, yPosition, { align: 'center' });
      
      // Add narrative content
      yPosition += 15;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      // Get narrative from the weeklyReport (assuming it's stored there)
      const firstWithNarrative = weeklyReport.find(entry => entry.narrative?.trim() !== "");
      const narrativeText = firstWithNarrative?.narrative || "No narrative available.";
      const narrativeLines = pdf.splitTextToSize(narrativeText, pageWidth - margin*2);
      
      // Handle multi-page narrative if needed
      for (let i = 0; i < narrativeLines.length; i++) {
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = await addHeader();
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
        }
        
        pdf.text(narrativeLines[i], margin, yPosition);
        yPosition += 7;
      }
      
      // Save the PDF without the week number
      pdf.save(`Weekly_Report.pdf`);
      toast.success('PDF generated successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF');
    }
  };

  console.log({ weeklyReport })
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 print:p-0">
      {/* Print Button - Hidden when printing */}
      <div className="print:hidden text-right">
        <Button onClick={generatePDF}>
          <Printer className="mr-2 h-4 w-4" />
          Save to PDF
        </Button>
      </div>
      <div id="weekly-report" className="max-w-5xl mx-auto p-6 space-y-6 print:p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 print:pb-2">
          <img
            src="/Picture1.png"
            alt="Left University Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <div className="text-center">
            <h1 className="text-xl font-bold">WESLEYAN UNIVERSITY - PHILIPPINES</h1>
            <p className="text-sm text-muted-foreground">Mabini Extension, Cabanatuan City, Nueva Ecija</p>
          </div>
          <img
            src="/Picture2.png"
            alt="Right University Logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Week Header */}
        <div className="text-center py-4">
          <h2 className="text-lg font-semibold">Weekly Accomplishment Report</h2>
        </div>

        {/* Timesheet Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">Date</TableHead>
              <TableHead className="w-32">Day</TableHead>
              <TableHead className="w-40">No. of Working Hours</TableHead>
              <TableHead>Accomplishment</TableHead>
              <TableHead className="w-32">Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weeklyReport.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.day}</TableCell>
                <TableCell className="whitespace-pre-line">{calculateWorkingHours(entry.timeIn, entry.timeOut)}</TableCell>
                <TableCell>{entry.report || "No report"}</TableCell>
                <TableCell>{""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Total Hours */}
        <div className="pt-4 border-t">
          <p className="font-semibold">
            Total Number of Hours: {formatTotalHours(calculateTotalHours())}
          </p>
        </div>

        {/* Certification */}
        <div className="pt-8 text-center">
          <p className="mb-4">Certified by:</p>
          <p className="font-semibold">{supervisorName || 'Not Assigned'}</p>
          <p className="text-sm text-muted-foreground">Name of Trainor</p>
        </div>
      </div>
      
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
          }
          @page {
            margin: 2cm;
          }
        }
      `}</style>
    </div>
  )
}
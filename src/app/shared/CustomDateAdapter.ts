import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import dayjs from 'dayjs';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
    override format(date: Date): string {
        const dateSelected = dayjs(date)        
        return `${dateSelected.format('DD/MMM/YYYY')}`
    }
}
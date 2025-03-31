"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerFieldProps {
  name: string;
  control: any;
  rules?: any;
  placeholder?: string;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  control,
  rules,
  placeholder = "Pick a date",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { invalid, error },
      }) => (
        <div>
          <Popover>
            <PopoverTrigger
              asChild
              className=" bg-[#171818] h-10 border-none rounded-xl">
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal dark:bg-[#171818] ",
                  !value && "text-muted-foreground",
                )}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? (
                  format(new Date(value), "PPP")
                ) : (
                  <span>{placeholder}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={value}
                onSelect={(date: Date | undefined) => onChange(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {invalid && (
            <span className="text-destructive block mt-2 text-sm">
              {error?.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

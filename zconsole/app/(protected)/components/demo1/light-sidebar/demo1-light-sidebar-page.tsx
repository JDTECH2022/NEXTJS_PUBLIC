import { Fragment, useState } from 'react';
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from '@/layouts/demo1/components/toolbar';
import { addDays, format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Container } from '@/components/common/container';
import { Demo1LightSidebarContent } from './';
import api, { apiFetch, apiRequest } from '@/lib/api';
import { ZuelConfig } from '@/config/zuel.config';
export function Demo1LightSidebarPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(
    date,
  );

  const handleDateRangeApply = () => {
    setDate(tempDateRange); // Save the temporary date range to the main state
    setIsOpen(false); // Close the popover
  };

  const handleDateRangeReset = async () =>   {
    // eslint-disable-next-line react-hooks/rules-of-hooks


    //const data =  auth();
    setTempDateRange(undefined);

    //const result = await clientFetch("https://zuelpay.in/webhook/api/app_other/notify?type=CREDIT CARD");

   // console.log(result);

    console.log(ZuelConfig.apiUrl);


/*
    const response = await apiFetch('https://zuelpay.in/webhook/api/app_other/notify?type=CREDIT CARD', {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        //...(req?.headers?.cookie ? { cookie: req.headers.cookie } : {}),

      },
     // body: JSON.stringify(null),
    });
    const  message  = await response.json();

    console.log(message.name);


 */





    const response = await apiRequest();

    if(response){
      console.log(JSON.stringify(response));
    }




    // Reset the temporary date range
  };

  const defaultStartDate = new Date(); // Default start date fallback

  return (
    <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading
            title="Dashboard"
            description="Central Hub for Personal Customization"
          />
          <ToolbarActions>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button id="date" variant="outline">
                  <CalendarDays size={16} className="me-0.5" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={tempDateRange?.from || defaultStartDate}
                  selected={tempDateRange}
                  onSelect={setTempDateRange}
                  numberOfMonths={2}
                />
                <div className="flex items-center justify-end gap-1.5 border-t border-border p-3">
                  <Button variant="outline" onClick={handleDateRangeReset}>
                    Reset
                  </Button>
                  <Button onClick={handleDateRangeApply}>Apply</Button>
                </div>
              </PopoverContent>
            </Popover>
          </ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <Demo1LightSidebarContent />
      </Container>
    </Fragment>
  );
}

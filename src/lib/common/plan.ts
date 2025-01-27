interface PlanSwitchParams {
    currentPrice: number;         
    newPrice: number;            
    billingCycleDays: number;    
    currentStartDate: number;    
    currentEndDate: number;      
   }
   
   interface PlanSwitchResult {
    nextPlanStartDate: number;   
    remainingDays: number;       
    amountDue: number;          
   }
   
   export const calculatePlanSwitch = ({
    currentPrice,
    newPrice, 
    billingCycleDays,
    currentStartDate,
    currentEndDate
   }: PlanSwitchParams): PlanSwitchResult => {
   
    console.log('Input Parameters:', {
      currentPrice,
      newPrice,
      billingCycleDays, 
      currentStartDate,
      currentEndDate,
      currentStartDateReadable: new Date(currentStartDate * 1000).toLocaleString(),
      currentEndDateReadable: new Date(currentEndDate * 1000).toLocaleString()
    });
   
    // Calculate daily prices
    const currentPlanDailyPrice = Math.round(currentPrice / billingCycleDays);
    const newPlanDailyPrice = Math.round(newPrice / billingCycleDays);
    
    console.log('Daily Prices:', {
      currentPlanDailyPrice,
      newPlanDailyPrice
    });
   
    // Calculate days used
    const now = Math.floor(Date.now() / 1000);
    const daysUsed = Math.floor((now - currentStartDate) / (24 * 60 * 60));
    const normalizedDaysUsed = daysUsed % billingCycleDays;
    const remainingDays = billingCycleDays - normalizedDaysUsed;
   
    console.log('Time Calculations:', {
      now,
      nowReadable: new Date(now * 1000).toLocaleString(),
      daysUsed,
      normalizedDaysUsed,
      remainingDays
    });
   
    // Downgrade case
    if (newPlanDailyPrice < currentPlanDailyPrice) {
      console.log('Downgrade Case - returning:', {
        nextPlanStartDate: currentEndDate,
        nextPlanStartDateReadable: new Date(currentEndDate * 1000).toLocaleString(),
        remainingDays,
        amountDue: 0
      });
   
      return {
        nextPlanStartDate: currentEndDate,
        remainingDays,
        amountDue: 0
      };
    }
   
    // Upgrade case
    const remainingBalance = currentPlanDailyPrice * remainingDays;
    const daysInNewPlan = Math.floor(remainingBalance / newPlanDailyPrice);
    
    // Round to the start of the next day in UTC
    const nowDate = new Date(now * 1000);
    const utcMidnight = Date.UTC(
        nowDate.getUTCFullYear(),
        nowDate.getUTCMonth(),
        nowDate.getUTCDate() + 1, // Add 1 to get next day
        0, 0, 0, 0
    );
    const nextPlanStartDate = Math.floor(utcMidnight / 1000) + (daysInNewPlan * 24 * 60 * 60);
    const amountDue = Math.max(0, (remainingDays * newPlanDailyPrice) - remainingBalance);
   
    console.log('Upgrade Calculations:', {
      remainingBalance,
      daysInNewPlan,
      nextPlanStartDate,
      nextPlanStartDateReadable: new Date(nextPlanStartDate * 1000).toLocaleString(),
      amountDue
    });
   
    return {
      nextPlanStartDate,
      remainingDays: daysInNewPlan,
      amountDue
    };
   };
   
   // Example usage:
   /*
   const result = calculatePlanSwitch({
    currentPrice: 1000,
    newPrice: 2000,
    billingCycleDays: 30,
    currentStartDate: 1737816642,
    currentEndDate: 1740421800
   });
   console.log('Final Result:', result);
   */
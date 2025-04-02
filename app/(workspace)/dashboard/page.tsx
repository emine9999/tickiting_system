import { RollingChart } from '@/components/charts/RollingChart';
import { FileDown, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { DonutChart } from '@/components/charts/DonutChart';
import { ChannelsChart } from '@/components/charts/ChannelsChart';
import {auth} from '@/auth'
export default async function Dashboard() {
  const session = await auth()
  console.log(session)
  const data = [
    {
      title: 'Created Tickets',
      chiffre: '24,206',
      pourcentage: '-6',
      icon: ArrowDownLeft,
    },
    {
      title: 'Unsolved Tickets',
      chiffre: '64,206',
      pourcentage: '5',
      icon: ArrowUpRight,
    },
    {
      title: 'Solved Tickets',
      chiffre: '14,206',
      pourcentage: '16',
      icon: ArrowUpRight,
    },
    {
      title: 'Average First Reply',
      chiffre: '4,206',
      pourcentage: '30',
      icon: ArrowUpRight,
    },
  ];

  return (
    <div className=" w-full flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 items-center gap-3 bg-gray-50 dark:bg-gray-800 shadow-sm">
        <h1 className="font-semibold text-lg sm:text-xl">Hello, {session?.user?.name || ""}</h1>
        <div className="flex">
          <button className="flex items-center gap-2 justify-center px-4 py-2.5 bg-emerald-600 dark:bg-emerald-500 rounded-lg text-sm font-medium text-white hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-sm">
            Export CSV
            <FileDown size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-4 sm:p-6">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((item, index) => {
            const IconComponent = item.icon;
            const isNegative = parseInt(item.pourcentage, 10) < 0;
            return (
              <div 
                className="flex flex-col items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 gap-3 p-4 sm:p-6 transition-all hover:shadow-md" 
                key={index}
              >
                <h3 className="text-gray-500 dark:text-gray-400 text-sm xl:text-base text-center font-medium">
                  {item.title}
                </h3>
                <div className="flex gap-3 items-center">
                  <span className="text-base sm:text-lg xl:text-2xl font-bold">
                    {item.chiffre}
                  </span>
                  <span 
                    className={`${
                      isNegative 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                        : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    } rounded-lg px-2 py-1 flex items-center text-xs font-medium`}
                  >
                    {isNegative ? '' : '+'}
                    {item.pourcentage}%
                    <IconComponent className="ml-1" size={14} />
                  </span>
                </div>
                <h3 className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm underline text-center hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-colors">
                  Compare to last month
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart Section - First Row */}
      <div className="flex-grow p-4 sm:p-6">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 h-full">
          <div className="flex flex-col justify-start p-4 sm:p-6 gap-4 h-full w-full bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h1 className="font-bold text-gray-700 dark:text-gray-200 text-base sm:text-lg px-1">
              Average Tickets Created
            </h1>
            <div className="flex-grow">
              <RollingChart />
            </div>
          </div>
          <div className="flex flex-col justify-start p-4 sm:p-6 gap-4 h-full w-full bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h1 className="font-bold text-gray-700 dark:text-gray-200 text-base sm:text-lg px-1">
              Ticket By Reply Time
            </h1>
            <div className="flex-grow">
              <DonutChart />
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section - Second Row */}
      <div className="p-4 sm:p-6 h-fit ">
        <div className="h-full bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 sm:p-6">
          <h1 className="font-bold text-gray-700 dark:text-gray-200 text-base sm:text-lg mb-4">
            Ticket Channels
          </h1>
          <div className="h-5/6">
            <ChannelsChart />
          </div>
        </div>
      </div>
    </div>
  );
}
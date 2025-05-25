import MeetingTypeList from '@/components/meet/MeetingTypeList';
import { CalendarDays, Clock, Sun, CloudSun, Moon, Star } from 'lucide-react';

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);

  const hour = now.getHours();
  const getGreeting = () => {
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getGreetingIcon = () => {
    if (hour < 12) return <Sun className="w-6 h-6 text-yellow-500" />;
    if (hour < 17) return <CloudSun className="w-6 h-6 text-orange-500" />;
    return <Moon className="w-6 h-6 text-blue-400" />;
  };

  return (
    <section className="flex size-full flex-col gap-8  bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[280px] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-800 dark:via-blue-800 dark:to-indigo-900">
        {/* Floating Elements */}
        <div className="absolute top-8 right-8 opacity-20">
          <Star className="w-8 h-8 text-white animate-pulse" />
        </div>
        <div className="absolute bottom-12 right-16 opacity-30">
          <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
        </div>
        <div className="absolute top-16 left-1/3 opacity-25">
          <div
            className="w-6 h-6 bg-white rounded-full animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-8 lg:p-12">
          {/* Greeting */}
          <div className="flex items-center gap-3 mb-4">
            {getGreetingIcon()}
            <span className="text-white/90 text-lg font-medium">{getGreeting()}</span>
          </div>

          {/* Time and Date */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Clock className="w-8 h-8 text-white/80" />
              <h1 className="text-5xl lg:text-7xl font-bold text-white drop-shadow-lg">
                {time}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-white/70" />
              <p className="text-lg lg:text-xl font-medium text-white/90">{date}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6 mt-6 lg:mt-0">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">12</span>
              <span className="text-xs text-white/70 uppercase tracking-wide">Meetings</span>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">5</span>
              <span className="text-xs text-white/70 uppercase tracking-wide">Today</span>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">3</span>
              <span className="text-xs text-white/70 uppercase tracking-wide">Upcoming</span>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Welcome to TickHub
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Start your day with productivity. Schedule meetings, manage your time, and
              collaborate seamlessly with your team.
            </p>
          </div>
        </div>
      </div>

      {/* Meeting Types */}
      <div className="flex-1">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Quick Actions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose how you'd like to connect with others
          </p>
        </div>
        <MeetingTypeList />
      </div>
    </section>
  );
};

export default Home;
